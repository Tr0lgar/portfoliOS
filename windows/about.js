export function createAboutContent() {
    return `
        <div class="about-modern">
            <!-- Hero Section -->
            <div class="about-hero">
                <div class="hero-avatar-wrapper">
                    <img src="images/profile-picture.jpg" alt="Mathis" class="hero-avatar">
                    <div class="status-indicator"></div>
                </div>
                <h1 class="hero-title">Mathis Derwael</h1>
                <p class="hero-subtitle">Junior Web Developer</p>
                <div class="hero-links">
                    <a href="https://www.linkedin.com/in/mathis-derwael" target="_blank" rel="noopener noreferrer" class="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn
                    </a>
                    <a href="https://github.com/Tr0lgar" target="_blank" rel="noopener noreferrer" class="social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>

            <!-- Bento Grid -->
            <div class="about-bento">
                <!-- Story Card -->
                <div class="bento-card story-card">
                    <div class="card-icon">🚀</div>
                    <h3>My Journey</h3>
                    <p>
                        From surgery aspirations to web development during COVID-19. 
                        I redirected my scientific rigor toward building digital solutions, 
                        recently completing an intensive program with an 8-week company internship.
                    </p>
                </div>

                <!-- Current Focus -->
                <div class="bento-card focus-card">
                    <div class="card-icon">💡</div>
                    <h3>Currently</h3>
                    <ul class="focus-list">
                        <li>🔍 Seeking web development opportunities</li>
                        <li>🛠️ Building side projects</li>
                        <li>📚 Exploring modern tech stacks</li>
                    </ul>
                </div>

                <!-- Tech Stack Card -->
                <div class="bento-card tech-card">
                    <div class="card-icon">🧰</div>
                    <h3>Tech Stack</h3>
                    <div class="tech-categories">
                        <div class="tech-category">
                            <span class="category-label">Frontend</span>
                            <div class="tech-badges">
                                <span class="tech-badge">HTML5</span>
                                <span class="tech-badge">CSS3</span>
                                <span class="tech-badge">JavaScript</span>
                                <span class="tech-badge">TypeScript</span>
                                <span class="tech-badge">React</span>
                                <span class="tech-badge">Angular</span>
                                <span class="tech-badge">Vue</span>
                            </div>
                        </div>
                        <div class="tech-category">
                            <span class="category-label">Backend</span>
                            <div class="tech-badges">
                                <span class="tech-badge">Node.js</span>
                                <span class="tech-badge">Express</span>
                                <span class="tech-badge">PHP</span>
                                <span class="tech-badge">Laravel</span>
                            </div>
                        </div>
                        <div class="tech-category">
                            <span class="category-label">Database</span>
                            <div class="tech-badges">
                                <span class="tech-badge">MongoDB</span>
                                <span class="tech-badge">PostgreSQL</span>
                                <span class="tech-badge">MySQL</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Values Card -->
                <div class="bento-card values-card">
                    <div class="card-icon">⚡</div>
                    <h3>What Drives Me</h3>
                    <div class="values-grid">
                        <div class="value-item">
                            <div class="value-emoji">🎯</div>
                            <span>Precision</span>
                        </div>
                        <div class="value-item">
                            <div class="value-emoji">🧩</div>
                            <span>Problem Solving</span>
                        </div>
                        <div class="value-item">
                            <div class="value-emoji">📈</div>
                            <span>Continuous Learning</span>
                        </div>
                        <div class="value-item">
                            <div class="value-emoji">🤝</div>
                            <span>Collaboration</span>
                        </div>
                    </div>
                </div>

                <!-- Tools Card -->
                <div class="bento-card tools-card">
                    <div class="card-icon">🛠️</div>
                    <h3>Tools & Workflow</h3>
                    <div class="tools-list">
                        <div class="tool-item">
                            <span class="tool-name">Development</span>
                            <span class="tool-value">VS Code, JetBrains</span>
                        </div>
                        <div class="tool-item">
                            <span class="tool-name">Version Control</span>
                            <span class="tool-value">Git, GitHub, GitLab</span>
                        </div>
                        <div class="tool-item">
                            <span class="tool-name">Methodology</span>
                            <span class="tool-value">Agile, Scrum</span>
                        </div>
                        <div class="tool-item">
                            <span class="tool-name">Collaboration</span>
                            <span class="tool-value">Jira, Confluence</span>
                        </div>
                    </div>
                </div>

                <!-- CTA Card -->
                <div class="bento-card cta-card">
                    <h3>Let's Connect!</h3>
                    <p>Always open to discussing new projects, creative ideas, or opportunities.</p>
                    <button class="cta-button" onclick="document.querySelector('[data-app=contact]').click()">
                        Get in Touch
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}