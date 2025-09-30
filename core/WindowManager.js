/**
 * WindowManager - Handles window lifecycle and state
 */

import { EventBus } from './EventBus.js';
import { windowRegistry } from './WindowRegistry.js';

export class WindowManager {
    constructor() {
        this.windows = new Map();
        this.activeWindow = null;
        this.zIndexCounter = 10;
        this.eventBus = EventBus.getInstance();
    }

    openWindow(appId, icon) {
        // Restore if already exists
        if (this.windows.has(appId)) {
            this.restoreWindow(appId, icon);
            return;
        }

        // Create new window
        const windowConfig = windowRegistry.get(appId);
        if (!windowConfig) {
            console.error(`Window config not found for: ${appId}`);
            return;
        }

        try {
            const windowElement = this.createWindowElement(appId, windowConfig);

            windowElement.style.width = windowConfig.defaultWidth || '600px';
            windowElement.style.height = windowConfig.defaultHeight || '400px';

            document.body.appendChild(windowElement);

            this.windows.set(appId, {
                element: windowElement,
                config: windowConfig,
                icon: icon,
                cleanup: null
            });

            this.positionWindow(windowElement);
            this.initWindowControls(windowElement, appId, icon);
            this.makeDraggable(windowElement);
            this.focusWindow(windowElement);

            // Execute lifecycle hook
            if (windowConfig.onMount) {
                const cleanup = windowConfig.onMount(windowElement);
                if (cleanup) {
                    this.windows.get(appId).cleanup = cleanup;
                }
            }

            // Auto-maximize portfoliOS on first open
            if (appId === 'portfoliOS' && !windowElement.dataset.opened) {
                windowElement.classList.add('maximized');
                windowElement.dataset.opened = 'true';
            }

            icon?.classList.add('active');
        } catch (error) {
            console.error(`Failed to open window ${appId}:`, error);
        }
    }

    restoreWindow(appId, icon) {
        const windowData = this.windows.get(appId);
        if (!windowData) return;

        const { element } = windowData;
        element.style.display = 'block';
        element.classList.remove('minimizing', 'closing');
        this.focusWindow(element);
        icon?.classList.add('active');

        // Re-focus terminal input if needed
        if (appId === 'terminal') {
            const input = element.querySelector('.terminal-prompt');
            input?.focus();
        }
    }

    createWindowElement(appId, config) {
        const windowEl = document.createElement('div');
        windowEl.className = 'window';
        windowEl.id = appId;
        windowEl.dataset.appId = appId;

        windowEl.innerHTML = `
            <div class="window-header" style="background-color: ${config.headerColor || '#e0e0e0'}">
                <div class="window-title">
                    <span>${config.title}</span>
                </div>
                <div class="window-controls">
                    <img class="window-button minimize" src="assets/minimize.svg" alt="Minimize" draggable="false">
                    <img class="window-button maximize" src="assets/fullscreen.svg" alt="Maximize" draggable="false">
                    <img class="window-button close" src="assets/close.svg" alt="Close" draggable="false">
                </div>
            </div>
            <div class="window-content">
                ${config.content()}
            </div>
        `;

        return windowEl;
    }

    positionWindow(windowEl) {
        // Center window on screen
        requestAnimationFrame(() => {
            const rect = windowEl.getBoundingClientRect();
            windowEl.style.left = `calc(50% - ${rect.width / 2}px)`;
            windowEl.style.top = `calc(50% - ${rect.height / 2}px)`;
        });
    }

    initWindowControls(windowEl, appId, icon) {
        const closeBtn = windowEl.querySelector('.window-button.close');
        const maximizeBtn = windowEl.querySelector('.window-button.maximize');
        const minimizeBtn = windowEl.querySelector('.window-button.minimize');

        // Close
        closeBtn.addEventListener('click', () => {
            windowEl.classList.add('closing');
            windowEl.addEventListener('animationend', () => {
                this.destroyWindow(appId);
                icon?.classList.remove('active');
            }, { once: true });
        });

        // Maximize/Restore
        maximizeBtn.addEventListener('click', () => {
            const isMaximized = windowEl.classList.toggle('maximized');
            maximizeBtn.src = isMaximized
                ? 'assets/fullscreen_exit.svg'
                : 'assets/fullscreen.svg';
        });

        // Minimize
        minimizeBtn.addEventListener('click', () => {
            windowEl.classList.add('minimizing');
            windowEl.addEventListener('animationend', () => {
                windowEl.style.display = 'none';
                windowEl.classList.remove('minimizing');
            }, { once: true });
        });

        // Focus on click
        windowEl.addEventListener('mousedown', () => {
            this.focusWindow(windowEl);
        });
    }

    makeDraggable(windowEl) {
        const header = windowEl.querySelector('.window-header');
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        const onMouseDown = (e) => {
            if (windowEl.classList.contains('maximized')) return;
            if (e.target.closest('.window-button')) return; // Don't drag when clicking buttons

            isDragging = true;
            const rect = windowEl.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            windowEl.style.transition = 'none';
            e.preventDefault();
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;

            const x = e.clientX - startX;
            const y = e.clientY - startY;

            windowEl.style.left = `${x}px`;
            windowEl.style.top = `${y}px`;
            windowEl.style.transform = 'none';
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                windowEl.style.transition = '';
            }
        };

        header.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        // Store for cleanup
        windowEl._dragCleanup = () => {
            header.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }

    focusWindow(windowEl) {
        this.windows.forEach(({ element }) => {
            element.style.zIndex = '1';
        });
        windowEl.style.zIndex = String(++this.zIndexCounter);
        this.activeWindow = windowEl;
    }

    destroyWindow(appId) {
        const windowData = this.windows.get(appId);
        if (!windowData) return;

        const { element, cleanup } = windowData;

        // Execute cleanup hook
        if (cleanup) {
            try {
                cleanup();
            } catch (error) {
                console.error(`Cleanup error for ${appId}:`, error);
            }
        }

        // Remove drag listeners
        if (element._dragCleanup) {
            element._dragCleanup();
        }

        // Remove from DOM
        element.remove();
        this.windows.delete(appId);

        if (this.activeWindow === element) {
            this.activeWindow = null;
        }
    }

    cleanup() {
        this.windows.forEach((_, appId) => {
            this.destroyWindow(appId);
        });
        this.windows.clear();
    }
}