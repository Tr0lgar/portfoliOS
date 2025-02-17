export function createPortfoliOSContent() {
    return `
        <div class="stack-area">
        <div class="left">
            <img src="images/logo.png">
            <p>
                portfoliOS est une approche unique du portfolio traditionnel. Plutôt qu’une simple page web statique, 
                j’ai imaginé une expérience intéractive inspirée de l’apparence et des fonctionnalités d’un système d’exploitation (OS). 
                C’est une façon créative de présenter mes projets, mes compétences et ma personnalité tout en engageant les visiteurs.
            </p>
        </div>
        <div class="right">
            <div class="card">
                <h2>Bienvenue sur <strong>portfoliOS</strong></h2>
                <!--scroll down mouse animation by Deepak K Vijayan on codepen : https://codepen.io/2xsamurai/pen/WwmjKQ -->
                <div class="scroll-downs">
                  <div class="mousey">
                    <div class="scroller"></div>
                  </div>
                </div>
            </div>
            <div class="card">
                <h2>Fonctionnalités</h2>
                <p>Fenêtres modulables, barre des tâches, aplications intéractives</p>
            </div>
            <div class="card">
                <h2>Pourquoi ?</h2>
                <p>Je voulais repousser les limites de ce qu’un portfolio pouvait être, ne pas faire "comme tout le monde"</p>
            </div>
            <div class="card">
                <h2>Merci de visiter portfoliOS !</h2>
                <p> N’hésitez pas à explorer et à découvrir mon travail 😊</p>
            </div>
        </div>

        </div>
        
    `;
}

export function initPortfoliOSScroll() {
    const cards = document.querySelectorAll("#portfoliOS .card");
    const stackArea = document.querySelector("#portfoliOS .stack-area");
    const windowContent = document.querySelector("#portfoliOS .window-content");

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
        const distance = windowContent.clientHeight * 0.5;
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