import { createPortfoliOSContent } from "./windows/portfoliOS.js";
import { initPortfoliOSScroll } from "./windows/portfoliOS.js";
import { createAboutContent } from "./windows/about.js";
import { createAppsContent } from "./windows/apps.js";
import { createSettingsContent } from "./windows/settings.js";
import { createTerminalContent } from "./windows/terminal.js";
import { Terminal } from "./windows/terminal.js";
import { terminalCommands } from "./windows/terminal.js";
import { createContactContent } from "./windows/contact.js";

class PortfoliOS {
    constructor() {
        // Initialise les propriétés principales : une liste des fenêtres et la fenêtre active
        this.windows = new Map();
        this.activeWindow = null;
        this.initTaskbar();
    }

    // Configure les icônes de la barre des tâches pour ouvrir des fenêtres correspondantes
    initTaskbar() {
        document.querySelectorAll('.app-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const appId = icon.dataset.app;
                this.openWindow(appId);
            });
        });
    }

    // Ouvre une nouvelle fenêtre ou réaffiche une fenêtre existante
    openWindow(appId) {
        const icon = document.querySelector(`.app-icon[data-app="${appId}"]`);

        // Si la fenêtre existe déjà, elle est remise en avant
        if (this.windows.has(appId)) {
            const win = this.windows.get(appId);
            win.style.display = 'block';
            this.focusWindow(win);
            icon.classList.add('active');

            // Refocus sur l'input du terminal
            if (appId === "terminal") {
                const input = win.querySelector('.terminal-prompt');
                if (input) {
                    input.focus()
                }
            }
            return;
        }

        // Sinon, crée une nouvelle fenêtre
        const window = this.createWindow(appId);
        document.body.appendChild(window);
        this.windows.set(appId, window);

        // Centrage initial
        const rect = window.getBoundingClientRect();
        window.style.left = `calc(50% - ${rect.width / 2}px)`;
        window.style.top = `calc(50% - ${rect.height / 2}px)`;

        // Si c'est la première ouverture de portfoliOS, on la maximise directement
        if (appId === "portfoliOS" && !window.dataset.opened) {
            window.classList.add("maximized");
            window.dataset.opened = true; // Marque la fenêtre comme déjà ouverte une fois
        }

        if (appId === "terminal") {
            const container = document.getElementById("terminal-container");
            if (container) {
                new Terminal(container, terminalCommands);
            }
        }

        this.focusWindow(window);
        this.makeDraggable(window);
        icon.classList.add('active');
    }

    // Crée un élément DOM représentant une fenêtre et son contenu
    createWindow(appId) {
        const window = document.createElement('div');
        window.className = 'window';
        window.id = appId;
        window.dataset.appId = appId;
        window.style.width = '600px';
        window.style.height = '400px';

        const configs = {
            portfoliOS: { title: 'portfoliOS', color: '#e0e0e0', content: createPortfoliOSContent() },
            about: { title: 'À Propos', color: '#e0e0e0', content: createAboutContent() },
            apps: { title: 'Apps', color: '#e0e0e0', content: createAppsContent() },
            settings: { title: 'Paramètres', color: '#e0e0e0', content: createSettingsContent() },
            terminal: { title: 'Terminal', color: '#e0e0e0', content: createTerminalContent() },
            contact: { title: 'Contact', color: '#e0e0e0', content: createContactContent() }
        };

        const config = configs[appId];
        window.innerHTML = `
            <div class="window-header" id="${appId}" style="background-color: ${config.color}">
                <div class="window-title">
                    <span>${config.title}</span>
                </div>
                <div class="window-controls">
                    <img class="window-button minimize" src="assets/minimize.svg" alt="Minimize">
                    <img class="window-button maximize" src="assets/fullscreen.svg" alt="Fullscreen">
                    <img class="window-button close" src="assets/close.svg" alt="Close">
                </div>
            </div>
            <div class="window-content">
                ${config.content}
            </div>
        `;

        this.initWindowControls(window);

        if (appId === "portfoliOS") {
            setTimeout(() => {
                initPortfoliOSScroll();
            }, 0);
        }

        return window;
    }

    // Configure les boutons de contrôle (fermer, maximiser, minimiser)
    initWindowControls(window) {
        const closeBtn = window.querySelector('.window-button.close');
        const maximizeBtn = window.querySelector('.window-button.maximize');
        const minimizeBtn = window.querySelector('.window-button.minimize');
        const appId = window.dataset.appId;
        const icon = document.querySelector(`.app-icon[data-app="${appId}"]`);
    
        closeBtn.addEventListener('click', () => {
            window.classList.add('closing');
            window.addEventListener('animationend', () => {
                window.style.display = 'none';
                window.classList.remove('closing');
                icon.classList.remove('active');
            }, { once: true });
        });

        maximizeBtn.addEventListener('click', () => {
            const isMaximized = window.classList.toggle('maximized');
            maximizeBtn.src = isMaximized ? 'assets/fullscreen_exit.svg' : 'assets/fullscreen.svg';
        });
    
        minimizeBtn.addEventListener('click', () => {
            window.classList.add('minimizing');
            window.addEventListener('animationend', () => {
                window.style.display = 'none';
                window.classList.remove('minimizing');
                icon.classList.add('active');
            }, { once: true });
        });
    
        window.addEventListener('mousedown', () => this.focusWindow(window));
    }

    // Met une fenêtre en avant en ajustant l'ordre d'affichage
    focusWindow(window) {
        this.windows.forEach(win => {
            win.style.zIndex = '1';
        });
        window.style.zIndex = '10';
        this.activeWindow = window;
    }

    // Rend les fenêtres déplaçables
    makeDraggable(window) {
        const header = window.querySelector('.window-header');
        let isDragging = false;
        let startX, startY;

        header.addEventListener('mousedown', (e) => {
            if (window.classList.contains('maximized')) return;
            isDragging = true;
            const rect = window.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            window.style.transition = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.clientX - startX;
            const y = e.clientY - startY;
            window.style.left = `${x}px`;
            window.style.top = `${y}px`;
            window.style.transform = 'none';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                window.style.transition = '';
            }
        });
    }
}

// FIXME: le changement de la classe activeS dans settings ne fonctionne pas mais flemme pour le moment
document.body.addEventListener("click", (event) => {
    if (event.target.matches(".settings-sidebar li")) {
        const sidebar = document.querySelector(".settings-sidebar");
        const activeItem = document.querySelector(".settings-sidebar li.active");

        // Supprime l'ancienne classe active
        if (activeItem) activeItem.classList.remove("active");

        // Ajoute la classe active à l'élément cliqué
        event.target.classList.add("active");

        // Met à jour la position de l'effet glissant
        const topOffset = event.target.offsetTop;
        sidebar.style.setProperty("--active-top", `${topOffset}px`);
    }
});


// Initialisation
const portfoliOS = new PortfoliOS();