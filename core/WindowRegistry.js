/**
 * Window Registry - Configuration for all available windows
 */

import { createPortfoliOSContent, initPortfoliOSScroll } from '../windows/portfoliOS.js';
import { createAboutContent } from '../windows/about.js';
import { createAppsContent } from '../windows/apps.js';
import { createSettingsContent, initSettingsNavigation } from '../windows/settings.js';
import { createTerminalContent, initTerminal } from '../windows/terminal.js';
import { createContactContent } from '../windows/contact.js';

class WindowRegistry {
    constructor() {
        this.registry = new Map();
        this.registerWindows();
    }

    registerWindows() {
        this.register('portfoliOS', {
            title: 'portfoliOS',
            headerColor: '#e0e0e0',
            content: createPortfoliOSContent,
            onMount: (windowEl) => initPortfoliOSScroll(windowEl),
            defaultWidth: '800px',
            defaultHeight: '600px',
        });

        this.register('about', {
            title: 'About',
            headerColor: '#e0e0e0',
            content: createAboutContent,
        });

        this.register('apps', {
            title: 'Apps',
            headerColor: '#e0e0e0',
            content: createAppsContent,
        });

        this.register('settings', {
            title: 'Settings',
            headerColor: '#e0e0e0',
            content: createSettingsContent,
            onMount: (windowEl) => initSettingsNavigation(windowEl),
        });

        this.register('terminal', {
            title: 'Terminal',
            headerColor: '#e0e0e0',
            content: createTerminalContent,
            onMount: (windowEl) => initTerminal(windowEl),
        });

        this.register('contact', {
            title: 'Contact',
            headerColor: '#e0e0e0',
            content: createContactContent,
        });
    }

    register(id, config) {
        this.registry.set(id, config);
    }

    get(id) {
        return this.registry.get(id);
    }

    has(id) {
        return this.registry.has(id);
    }
}

export const windowRegistry = new WindowRegistry();