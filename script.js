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
            return;
        }

        // Sinon, crée une nouvelle fenêtre
        const window = this.createWindow(appId);
        document.body.appendChild(window);
        this.windows.set(appId, window);
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
        window.style.left = '50%';
        window.style.top = '50%';
        window.style.transform = 'translate(-50%, -50%)';

        const configs = {
            portfoliOS: { title: 'portfoliOS', color: '#e0e0e0', content: this.createPortfoliOSContent() },
            about: { title: 'À Propos', color: '#e0e0e0', content: this.createAboutContent() },
            apps: { title: 'Apps', color: '#e0e0e0', content: this.createAppsContent() },
            settings: { title: 'Paramètres', color: '#e0e0e0', content: this.createSettingsContent() },
            terminal: { title: 'Terminal', color: '#e0e0e0', content: this.createTerminalContent() },
            contact: { title: 'Contact', color: '#e0e0e0', content: this.createContactContent() }
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
        return window;
    }

    // Crée le contenu pour la fenêtre "Accueil"
    createPortfoliOSContent() {
        return `
            <h2>portfoliOS</h2>
            <p>
                <strong>Welcome to portfoliOS!</strong>
            </p>
            <p>
                portfoliOS is a unique twist on the traditional portfolio. Instead of a static webpage, 
                I envisioned a fully interactive experience inspired by the look and feel of an operating system (OS). 
                It’s a playful and creative way to showcase my projects, skills, and personality while engaging visitors.
            </p>
            <h3>What is portfoliOS?</h3>
            <p>
                portfoliOS replicates key features of an OS, such as draggable windows, a taskbar with app shortcuts, 
                and interactive applications. Each “application” represents a section of the portfolio:
            </p>
            <ul>
                <li><strong>About:</strong> Learn more about me and my background (coming soon!).</li>
                <li><strong>Projects:</strong> Explore my featured work, with links and descriptions.</li>
                <li><strong>Settings:</strong> Adjust themes or personalize your experience (coming soon!).</li>
                <li><strong>Terminal:</strong> An experimental feature to interact with the site in a command-line interface (coming soon!).</li>
                <li><strong>Contact:</strong> Easily get in touch with me (coming soon!).</li>
            </ul>
            <h3>Why build a portfolio like this?</h3>
            <p>
                I wanted to push the boundaries of what a portfolio could be. By building portfoliOS, I combined my love for 
                development, design, and creative experimentation. The goal is to demonstrate my technical skills while 
                creating something fun and memorable for visitors.
            </p>
            <h3>Technologies Used</h3>
            <p>
                portfoliOS is built using HTML, CSS, and JavaScript, without relying heavily on external frameworks. 
                This keeps the codebase lightweight and provides an opportunity to focus on core web development principles. 
                However, as the project grows, I might integrate tools or frameworks as needed.
            </p>
            <p>
                Thank you for visiting portfoliOS! Feel free to explore and check out my work. 😊
            </p>
        `;
    }

    // Crée le contenu pour la fenêtre "À Propos"
    createAboutContent() {
        return `
            <h2>À propos de moi</h2>
            <p>Work in progress</p>
        `;
    }

    // Crée le contenu pour la fenêtre "Projets"
    createAppsContent() {
        const projects = [
            { name: 'MyNyl', logo: 'images/mynyl-light.png', link: 'https://mynyl.netlify.app/' },
            { name: 'GobMouche', logo: 'images/frog.png', link: 'https://tr0lgar.github.io/Kermit/' },
            { name: 'CatFacts', logo: 'images/cat.png', link: 'https://tr0lgar.github.io/RandomCatFacts/' },
            { name: 'portfoliOS', logo: 'images/logo.png', link: 'https://github.com/Tr0lgar/portfoliOS' },
            // Ajouter d'autres projets ici
        ];
    
        const projectItems = projects.map(project => `
            <div class="app-item">
                <a href="${project.link}" target="_blank">
                    <img src="${project.logo}" alt="${project.name}">
                    <span>${project.name}</span>
                </a>
            </div>
        `).join('');
    
        return `
            <div class="app-grid">
                ${projectItems}
            </div>
        `;
    }

    // Crée le contenu pour la fenêtre "Paramètres"
    createSettingsContent() {
        return `
            <h2>Paramètres</h2>
            <p>Work in progress</p>
        `;
    }

    // Crée le contenu pour la fenêtre "Terminal"
    createTerminalContent() {
        return `
            <div class="terminal">
                <p><span>visitor@portfoliOS:~$</span>Work in progress</p>
            </div>
        `;
    }

    // Crée le contenu pour la fenêtre "Contact"
    createContactContent() {
        return `
            <form class="contact-form">
                <input type="email" placeholder="Votre email">
                <textarea placeholder="Work in progress" rows="6"></textarea>
                <button type="submit"><a href="https://youtu.be/vXYVfk7agqU" target="_blank">Envoyer</button>
            </form>
        `;
    }

    // Configure les boutons de contrôle (fermer, maximiser, minimiser)
    initWindowControls(window) {
        const closeBtn = window.querySelector('.window-button.close');
        const maximizeBtn = window.querySelector('.window-button.maximize');
        const minimizeBtn = window.querySelector('.window-button.minimize');
        const appId = window.dataset.appId;
        const icon = document.querySelector(`.app-icon[data-app="${appId}"]`);
    
        closeBtn.addEventListener('click', () => {
            window.style.display = 'none';
            icon.classList.remove('active');
        });

        maximizeBtn.addEventListener('click', () => {
            const isMaximized = window.classList.toggle('maximized');
            maximizeBtn.src = isMaximized ? 'assets/fullscreen_exit.svg' : 'assets/fullscreen.svg';
        });
    
        minimizeBtn.addEventListener('click', () => {
            window.style.display = 'none';
            icon.classList.add('active');
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

// Initialisation
const portfoliOS = new PortfoliOS();