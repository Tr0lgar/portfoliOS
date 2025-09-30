/**
 * portfoliOS Window - Stacked cards presentation
 */

export function createPortfoliOSContent() {
    return `
        <div class="stack-area">
            <div class="left">
                <img src="assets/logo.svg" alt="portfoliOS logo">
                <p>
                    portfoliOS is a playful twist on the classic portfolio. Instead of a static webpage, 
                    it offers an interactive experience inspired by the look and feel of an operating system (OS). 
                    It's a creative way to present my projects, skills, and personality while engaging visitors.
                </p>
            </div>
            <div class="right">
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
    `;
}

export function initPortfoliOSScroll(windowEl) {
    const cards = windowEl.querySelectorAll(".card");
    const stackArea = windowEl.querySelector(".stack-area");
    const windowContent = windowEl.querySelector(".window-content");

    if (!cards.length || !stackArea || !windowContent) return;

    const PER_CARD_SCROLL = 0.5;
    let animationId = null;

    function rotateCards() {
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
        if (animationId) return;

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

    rotateCards();
    windowContent.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function
    return () => {
        windowContent.removeEventListener("scroll", handleScroll);
        if (animationId) cancelAnimationFrame(animationId);
    };
}