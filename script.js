
/**
 * portfoliOS - Main Application Controller
 * Clean architecture with event-driven design
 */

import { WindowManager } from './core/WindowManager.js';
import { EventBus } from './core/EventBus.js';
import { windowRegistry } from './core/WindowRegistry.js';

class PortfoliOS {
    constructor() {
        this.windowManager = new WindowManager();
        this.eventBus = EventBus.getInstance();
        this.init();
    }

    init() {
        this.setupTaskbar();
        this.setupGlobalEvents();
        console.log('portfoliOS initialized');
    }

    setupTaskbar() {
        const taskbarIcons = document.querySelectorAll('.app-icon');

        taskbarIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const appId = icon.dataset.app;

                if (appId && windowRegistry.has(appId)) {
                    this.windowManager.openWindow(appId, icon);
                } else {
                    console.error(`Unknown app: ${appId}`);
                }
            });
        });
    }

    setupGlobalEvents() {
        // Settings sidebar navigation
        this.eventBus.on('settings:navigate', (sectionId) => {
            this.handleSettingsNavigation(sectionId);
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.windowManager.cleanup();
        });
    }

    handleSettingsNavigation(sectionId) {
        const sections = document.querySelectorAll('.settings-section');
        const menuItems = document.querySelectorAll('.settings-sidebar li');

        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });

        menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.section === sectionId);
        });
    }
}

// Bootstrap application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfoliOS());
} else {
    new PortfoliOS();
}
