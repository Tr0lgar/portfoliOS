/**
 * portfoliOS Window - Stacked cards presentation with container-based responsive
 */

/**
 * portfoliOS Window - Stacked cards presentation with simple mobile view
 */

export function createPortfoliOSContent() {
    return `
        <div class="stack-area">
            <div class="portfolio-layout">
                <!-- Mobile-only simple view -->
                <div class="mobile-simple-view">
                    <img src="assets/logo.svg" alt="portfoliOS logo" class="portfolio-logo">
                    <h1>portfoliOS</h1>
                    <p class="portfolio-description">
                        A playful twist on the classic portfolio. Instead of a static webpage, 
                        portfoliOS offers an interactive experience inspired by the look and feel of an operating system.
                    </p>
                    
                    <div class="feature-list">
                        <div class="feature-item">
                            <h3>🪟 Windows</h3>
                            <p>Resizable, draggable windows just like a real OS</p>
                        </div>
                        <div class="feature-item">
                            <h3>🎨 Interactive</h3>
                            <p>Explore apps, terminal, and projects</p>
                        </div>
                        <div class="feature-item">
                            <h3>💡 Creative</h3>
                            <p>A portfolio that doesn't feel like "just another page"</p>
                        </div>
                    </div>
                    
                    <p class="thanks-message">
                        Thanks for visiting! Feel free to explore my work 😊
                    </p>
                </div>

                <!-- Desktop cards view -->
                <div class="left desktop-only-section">
                    <img src="assets/logo.svg" alt="portfoliOS logo" class="portfolio-logo">
                    <p class="portfolio-description">
                        portfoliOS is a playful twist on the classic portfolio. Instead of a static webpage, 
                        it offers an interactive experience inspired by the look and feel of an operating system (OS). 
                        It's a creative way to present my projects, skills, and personality while engaging visitors.
                    </p>
                </div>
                
                <div class="right desktop-only-section">
                    <div class="card">
                        <h2>Welcome to <strong>portfoliOS</strong></h2>
                        <div class="scroll-downs" aria-hidden="true">
                            <div class="mousey">
                                <div class="scroller"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h2>Features</h2>
                        <p>Resizable windows, a taskbar, and interactive mini‑apps.</p>
                    </div>
                    <div class="card">
                        <h2>Why?</h2>
                        <p>I wanted to push the boundaries of what a portfolio can be—something that doesn't feel like "just another page".</p>
                    </div>
                    <div class="card">
                        <h2>Thanks for visiting!</h2>
                        <p>Feel free to explore and discover my work 😊</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initPortfoliOSScroll(windowEl) {
    const cards = windowEl.querySelectorAll(".card");
    const stackArea = windowEl.querySelector(".stack-area");
    const windowContent = windowEl.querySelector(".window-content");
    const portfolioLayout = windowEl.querySelector(".portfolio-layout");

    if (!windowContent) return;

    const PER_CARD_SCROLL = 0.5;
    let animationId = null;
    let resizeObserver = null;
    let isDesktop = false;

    function updateLayout() {
        const width = windowContent.clientWidth;
        const wasDesktop = isDesktop;
        isDesktop = width >= 700;

        portfolioLayout.classList.toggle('mobile-mode', !isDesktop);
        portfolioLayout.classList.toggle('desktop-mode', isDesktop);

        // Only initialize card scroll on desktop
        if (isDesktop && !wasDesktop) {
            rotateCards();
        }
    }

    function rotateCards() {
        if (!isDesktop || !cards.length) return;

        let angle = 0;
        cards.forEach((card, index) => {
            if (card.classList.contains("away")) {
                card.style.transform = `translateY(-120vh) rotate(-48deg)`;
            } else {
                card.style.transform = `rotate(${angle}deg)`;
                angle -= 10;
                card.style.zIndex = String(cards.length - index);
            }
        });
    }

    function handleScroll() {
        if (!isDesktop || animationId) return;

        animationId = requestAnimationFrame(() => {
            const distance = windowContent.clientHeight * PER_CARD_SCROLL;
            const topVal = stackArea.getBoundingClientRect().top;
            const index = Math.floor(-1 * (topVal / distance + 1));

            cards.forEach((card, i) => {
                card.classList.toggle("away", i <= index);
            });

            rotateCards();
            animationId = null;
        });
    }

    if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
            updateLayout();
        });
        resizeObserver.observe(windowContent);
    }

    updateLayout();
    windowContent.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
        windowContent.removeEventListener("scroll", handleScroll);
        if (animationId) cancelAnimationFrame(animationId);
        if (resizeObserver) resizeObserver.disconnect();
    };
}