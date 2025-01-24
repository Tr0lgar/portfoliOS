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
                <strong>Bienvenue sur portfoliOS !</strong>
            </p>
            <p>
                portfoliOS est une approche unique du portfolio traditionnel. Plutôt qu’une simple page web statique, 
                j’ai imaginé une expérience interactive inspirée de l’apparence et des fonctionnalités d’un système d’exploitation (OS). 
                C’est une façon ludique et créative de présenter mes projets, mes compétences et ma personnalité tout en engageant les visiteurs.
            </p>
            <h3>Qu’est-ce que portfoliOS ?</h3>
            <p>
                portfoliOS reproduit certaines fonctionnalités clés d’un système d’exploitation, telles que des fenêtres déplaçables, 
                une barre des tâches avec des raccourcis d’applications, et des applications interactives. Chaque “application” représente une section de mon portfolio :
            </p>
            <ul>
                <li><strong>À propos :</strong> En savoir plus sur moi et mon parcours (bientôt disponible !).</li>
                <li><strong>Projets :</strong> Découvrez mes réalisations principales.</li>
                <li><strong>Paramètres :</strong> Ajustez le thème ou personnalisez votre expérience (bientôt disponible !).</li>
                <li><strong>Terminal :</strong> Une fonctionnalité expérimentale pour interagir avec le site via une interface en ligne de commande (bientôt disponible !).</li>
                <li><strong>Contact :</strong> Une façon simple de me contacter (bientôt disponible !).</li>
            </ul>
            <h3>Pourquoi créer un portfolio comme celui-ci ?</h3>
            <p>
                Je voulais repousser les limites de ce qu’un portfolio pouvait être. En développant portfoliOS, j’ai combiné 
                ma passion pour le développement et l’expérimentation créative. Mon objectif est de démontrer mes compétences techniques tout en offrant une expérience amusante et mémorable aux visiteurs.
            </p>
            <h3>Technologies utilisées</h3>
            <p>
                portfoliOS est développé en utilisant HTML, CSS et JavaScript, sans dépendre fortement de frameworks externes. 
                Cela permet de garder le code léger tout en mettant l’accent sur les principes fondamentaux du développement web. 
                Cependant, au fur et à mesure de l’évolution du projet, je pourrais intégrer des outils ou frameworks si nécessaire.
            </p>
            <p>
                Merci de visiter portfoliOS ! N’hésitez pas à explorer et à découvrir mon travail. 😊
            </p>
        `;
    }

    // Crée le contenu pour la fenêtre "À Propos"
    createAboutContent() {
        return `
            <div class="about-me">
                <img src="images/profile-picture.png" alt="Photo de Mathis" class="profile-photo">
                <h2>👋 Bonjour, je suis Mathis !</h2>
                <p>
                    Passionné par les défis, la précision et les solutions concrètes, j’ai découvert le développement Web 
                    pendant le confinement COVID-19. Initialement attiré par la chirurgie, j’ai réorienté ma rigueur scientifique 
                    vers la création de solutions digitales. Après un détour par un cursus en informatique de gestion, j’ai choisi une formation 
                    en développement web, plus axée sur la pratique.
                </p>
                <br>
                <p>
                    💡 J'adore apprendre de nouvelles technologies et relever des défis techniques pour améliorer mes compétences.
                </p>
                
                <h3>🚀 Ce que je fais actuellement :</h3>
                <ul>
                    <li>🌱 Formation intensive en développement Web full stack.</li>
                    <li>🛠️ Exploration de technologies modernes : <strong>HTML</strong>, <strong>CSS</strong>, 
                        <strong>JavaScript</strong>, <strong>Node.js</strong>, <strong>React.js</strong>, <strong>Angular</strong>, 
                        <strong>Express</strong>, <strong>MongoDB</strong>.
                    </li>
                    <li>📚 Projets pratiques et collaboratifs pour renforcer mes compétences techniques.</li>
                </ul>
                
                <h3>🧰 Mes outils et compétences actuels :</h3>
                <ul>
                    <li><strong>Frontend :</strong> HTML5, CSS3, SCSS, JavaScript.</li>
                    <li><strong>Backend :</strong> PHP, Laravel, Java, C#.</li>
                    <li><strong>Bases de données :</strong> SQL, PostgreSQL.</li>
                    <li><strong>Outils :</strong> Git/GitHub/GitLab, VS Code, suite Jetbrains, Jira, Confluence.</li>
                    <li><strong>Méthodes de travail :</strong> Agile (SCRUM), gestion de projets collaboratifs, résolution de problèmes.</li>
                </ul>
                
                <h3>🌍 Retrouvez-moi ici :</h3>
                <ul>
                    <li><strong>LinkedIn :</strong> <a href="https://www.linkedin.com/in/mathis-derwael" target="_blank">Mathis Derwael</a></li>
                    <li><strong>GitHub :</strong> <a href="https://github.com/Tr0lgar" target="_blank">GitHub</a></li>
                </ul>
            </div>

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