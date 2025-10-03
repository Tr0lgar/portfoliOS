export class MobileHomeScreen {
    constructor(container, apps) {
        this.container = container;
        this.apps = apps;
        this.currentPage = 0;
        this.render();
    }

    render() {
        this.container.innerHTML = `
            <div class="mobile-home">
                <div class="mobile-status-bar">
                    <span class="time">${this.getCurrentTime()}</span>
                    <span class="icons">📶 📡 🔋</span>
                </div>
                
                <div class="mobile-app-grid">
                    ${this.apps.map(app => `
                        <button class="mobile-app-icon" data-app="${app.id}">
                            <div class="app-icon-wrapper">
                                <img src="${app.icon}" alt="${app.title}">
                            </div>
                            <span class="app-label">${app.title}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="mobile-dock">
                    <button class="mobile-app-icon" data-app="about">
                        <img src="assets/face.svg" alt="About">
                    </button>
                    <button class="mobile-app-icon" data-app="terminal">
                        <img src="assets/terminal.svg" alt="Terminal">
                    </button>
                    <button class="mobile-app-icon" data-app="contact">
                        <img src="assets/contact.svg" alt="Contact">
                    </button>
                </div>
                
                <div class="mobile-home-indicator"></div>
            </div>
        `;

        this.bindEvents();
        this.startClock();
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }

    startClock() {
        setInterval(() => {
            const timeEl = this.container.querySelector('.time');
            if (timeEl) timeEl.textContent = this.getCurrentTime();
        }, 1000);
    }

    bindEvents() {
        this.container.querySelectorAll('.mobile-app-icon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const appId = btn.dataset.app;
                this.onAppClick(appId);
            });
        });
    }

    onAppClick(appId) {
        // This will be connected to WindowManager
        console.log('Opening app:', appId);
    }
}
