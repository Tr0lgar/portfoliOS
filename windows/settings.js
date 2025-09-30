/**
 * Settings Window
 */

import { EventBus } from '../core/EventBus.js';

export function createSettingsContent() {
    return `
        <div class="settings-container">
            <nav class="settings-sidebar">
                <ul>
                    <li data-section="general" class="active">General</li>
                    <li data-section="theme">Theme</li>
                    <li data-section="notifications">Notifications</li>
                    <li data-section="account">Account</li>
                </ul>
            </nav>

            <div class="settings-content">
                <div id="general" class="settings-section active">
                    <h2>General Settings</h2>
                    <p>Global application preferences and basic behavior.</p>
                </div>
                <div id="theme" class="settings-section">
                    <h2>Theme</h2>
                    <p>Customize the look and feel of the OS.</p>
                </div>
                <div id="notifications" class="settings-section">
                    <h2>Notifications</h2>
                    <p>Manage your notification preferences.</p>
                </div>
                <div id="account" class="settings-section">
                    <h2>Account</h2>
                    <p>Account information and management.</p>
                </div>
            </div>
        </div>
    `;
}

export function initSettingsNavigation(windowEl) {
    const eventBus = EventBus.getInstance();
    const sidebar = windowEl.querySelector('.settings-sidebar');

    if (!sidebar) return;

    const handleClick = (e) => {
        const item = e.target.closest('li[data-section]');
        if (!item) return;

        const sectionId = item.dataset.section;
        eventBus.emit('settings:navigate', sectionId);
    };

    sidebar.addEventListener('click', handleClick);

    // Cleanup
    return () => {
        sidebar.removeEventListener('click', handleClick);
    };
}