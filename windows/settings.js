export function createSettingsContent() {
    return `
        <div class="settings-container">
            <!-- Sidebar -->
            <nav class="settings-sidebar">
                <ul>
                    <li data-section="general" class="active">Général</li>
                    <li data-section="theme">Thème</li>
                    <li data-section="notifications">Notifications</li>
                    <li data-section="account">Compte</li>
                </ul>
            </nav>

            <!-- Content -->
            <div class="settings-content">
                <div id="general" class="settings-section active">
                    <h2>General settings</h2>
                    <p>Global application preferences and basic behavior.</p>
                </div>
                <div id="theme" class="settings-section">
                    <h2>Thème</h2>
                    <p>Customize the look and feel of the OS.</p>
                </div>
                <div id="notifications" class="settings-section">
                    <h2>Notifications</h2>
                    <p>Manage your notification preferences.</p>
                </div>
                <div id="account" class="settings-section">
                    <h2>Compte</h2>
                    <p>Account information and management.</p>
                </div>
            </div>
        </div>
    `;
}
