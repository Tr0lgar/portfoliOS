export function createSettingsContent() {
    return `
        <div class="settings-container">
            <!-- Barre de navigation latérale -->
            <nav class="settings-sidebar">
                <ul>
                    <li data-section="general" class="active">Général</li>
                    <li data-section="theme">Thème</li>
                    <li data-section="notifications">Notifications</li>
                    <li data-section="account">Compte</li>
                </ul>
            </nav>

            <!-- Contenu dynamique -->
            <div class="settings-content">
                <div id="general" class="settings-section active">
                    <h2>Paramètres Généraux</h2>
                    <p>Réglages généraux de l'application.</p>
                </div>
                <div id="theme" class="settings-section">
                    <h2>Thème</h2>
                    <p>Personnalisez l'apparence de l'OS.</p>
                </div>
                <div id="notifications" class="settings-section">
                    <h2>Notifications</h2>
                    <p>Gérez vos préférences de notifications.</p>
                </div>
                <div id="account" class="settings-section">
                    <h2>Compte</h2>
                    <p>Informations et gestion du compte.</p>
                </div>
            </div>
        </div>
    `;
}
