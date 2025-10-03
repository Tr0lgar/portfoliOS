/**
 * portfoliOS - Main Application Controller
 */

import { WindowManager } from './core/WindowManager.js';
import { EventBus } from './core/EventBus.js';
import { windowRegistry } from './core/WindowRegistry.js';
import { ResponsiveManager } from './core/ResponsiveManager.js';

class PortfoliOS {
    constructor() {
        this.windowManager = new WindowManager();
        this.eventBus = EventBus.getInstance();
        this.responsiveManager = new ResponsiveManager();
        this.init();
    }

    init() {
        this.setupTaskbar();
        this.setupMobileHome();
        this.setupGlobalEvents();
        this.updateMobileClock();
        console.log('portfoliOS initialized');
    }

    setupTaskbar() {
        const taskbarIcons = document.querySelectorAll('.taskbar .app-icon');
        taskbarIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const appId = icon.dataset.app;
                if (appId && windowRegistry.has(appId)) {
                    this.windowManager.openWindow(appId, icon);
                }
            });
        });
    }

    setupMobileHome() {
        const homeIcons = document.querySelectorAll('.home-app-icon');
        homeIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const appId = icon.dataset.app;
                if (appId && windowRegistry.has(appId)) {
                    this.windowManager.openWindow(appId, null);
                }
            });
        });
    }

    setupGlobalEvents() {
        this.eventBus.on('settings:navigate', (sectionId) => {
            this.handleSettingsNavigation(sectionId);
        });

        window.addEventListener('beforeunload', () => {
            this.windowManager.cleanup();
        });

        // Close all windows when switching to mobile home
        document.addEventListener('viewport:change', (e) => {
            if (e.detail.isMobile) {
                this.windowManager.cleanup();
            }
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

    updateMobileClock() {
        const timeEl = document.getElementById('mobile-time');
        if (!timeEl) return;

        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            timeEl.textContent = `${hours}:${minutes}`;
        };

        updateTime();
        setInterval(updateTime, 60000);
    }
}

// Bootstrap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfoliOS());
} else {
    new PortfoliOS();
}