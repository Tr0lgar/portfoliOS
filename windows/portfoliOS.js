export function createPortfoliOSContent() {
    return `
        <div class="stack-area">
        <div class="left">
            <img src="assets/logo.svg">
            <p>
                portfoliOS is a playful twist on the classic portfolio. Instead of a static webpage, 
                    it offers an interactive experience inspired by the look and feel of an operating system (OS). 
                    It’s a creative way to present my projects, skills, and personality while engaging visitors.
            </p>
        </div>
        <div class="right">
            <div class="card">
                <h2>Welcome to <strong>portfoliOS</strong></h2>
                <!--scroll down mouse animation by Deepak K Vijayan on codepen : https://codepen.io/2xsamurai/pen/WwmjKQ -->
                <div class="scroll-downs">
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
                <h2>Why ?</h2>
                <p>I wanted to push the boundaries of what a portfolio can be—something that doesn’t feel like “just another page”.</p>
            </div>
            <div class="card">
                <h2>Thanks for visiting!</h2>
                <p>Feel free to explore and discover my work 😊</p>
            </div>
        </div>

        </div>
    `;
}

export function initPortfoliOSScroll() {
    const cards = document.querySelectorAll("#portfoliOS .card");
    const stackArea = document.querySelector("#portfoliOS .stack-area");
    const windowContent = document.querySelector("#portfoliOS .window-content");

    const PER_CARD_SCROLL = 0.5;

    function rotateCards() {
        let angle = 0;
        cards.forEach((card, index) => {
            if (card.classList.contains("away")) {
                card.style.transform = `translateY(-120vh) rotate(-48deg)`;
            } else {
                card.style.transform = `rotate(${angle}deg)`;
                angle = angle - 10;
                card.style.zIndex = cards.length - index;
            }
        });
    }

    rotateCards();

    windowContent.addEventListener("scroll", () => {
        const distance = windowContent.clientHeight * PER_CARD_SCROLL;

        const topVal = stackArea.getBoundingClientRect().top;
        const index = -1 * (topVal / distance + 1);
        const adjustedIndex = Math.floor(index);

        cards.forEach((card, i) => {
            if (i <= adjustedIndex) {
                card.classList.add("away");
            } else {
                card.classList.remove("away");
            }
        });
        rotateCards();
    });
}
