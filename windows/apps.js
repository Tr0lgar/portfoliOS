export function createAppsContent() {
    const projects = [
        { name: 'MyNyl', logo: 'images/mynyl-light.png', link: 'https://mynyl.netlify.app/' },
        { name: 'GobMouche', logo: 'images/frog.png', link: 'https://tr0lgar.github.io/Kermit/' },
        { name: 'CatFacts', logo: 'images/cat.png', link: 'https://tr0lgar.github.io/RandomCatFacts/' },
        { name: 'portfoliOS', logo: './assets/logo.svg', link: 'https://github.com/Tr0lgar/portfoliOS' },
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