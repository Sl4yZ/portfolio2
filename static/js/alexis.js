const titreSpans = document.querySelectorAll('h1 span');
const titreSpans2 = document.querySelectorAll('.h3-wrapper div span');
const h3Elements = document.querySelectorAll('.h3-wrapper div');
const btns = document.querySelectorAll('.btn-first');
const logo = document.querySelector('.logo');
const medias = document.querySelectorAll('.bulle');
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');
const link = document.querySelector('.links');
const header = document.querySelector('header');
const contentElements = document.querySelectorAll('.container-first, .lignes, .logo, .links, .medias');
let currentIndex = 0;
let scrollCount = 0;
let canScroll = true;

// Variables pour le défilement tactile
let startY = 0;
let endY = 0;

// Ajout des événements au chargement de la page
window.addEventListener('load', () => {
    const TL = gsap.timeline({paused: true});

    TL
        .staggerFrom(titreSpans, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.2)
        .staggerFrom(titreSpans2, 1, {top: -50, opacity: 0, ease: "power2.out"}, 0.2)
        .from(l1, 1, {width: 0, ease: "power2.out"}, '-=2')
        .from(l2, 1, {width: 0, ease: "power2.out"}, '-=2')
        .from(link, 0.1, {opacity: 0}, '-=2')
        .from(link, 1, {width: 0, ease: "power2.out"}, '-=2')
        .from(logo, 0.4, {transform: "scale(0)", ease: "power2.out"}, '-=2')
        .staggerFrom(medias, 1, {right: -200, ease: "power2.out"}, 0.3, '-=1');

    TL.play();
});

// Gestion du défilement avec la molette
window.addEventListener('wheel', (event) => handleScroll(event.deltaY > 0 ? 1 : -1));

// Gestion du défilement tactile
window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    endY = event.touches[0].clientY;
    const direction = startY - endY > 0 ? 1 : -1;
    handleScroll(direction);
});

// Fonction de gestion du défilement
function handleScroll(direction) {
    if (!canScroll) return;
    canScroll = false;

    h3Elements[currentIndex]?.classList.remove('visible');

    let previousIndex = currentIndex;
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= h3Elements.length) currentIndex = h3Elements.length - 1;

    // Ajout des comportements pour chaque index
    if (currentIndex === 1) {
        document.body.style.backgroundPosition = 'right center';

        if (scrollCount === 1) {
            setTimeout(() => {
                window.location.replace('alexis2.html');
            }, 500);
        }
    } else if (currentIndex === 0) {
        document.body.style.backgroundPosition = 'left center';
    }

    if (currentIndex === 2) {
        contentElements.forEach(element => element.classList.add('hidden-content'));
        header.classList.add('hidden-header');
        document.body.classList.add('white-screen');
    } else {
        contentElements.forEach(element => element.classList.remove('hidden-content'));
        header.classList.remove('hidden-header');
        document.body.classList.remove('white-screen');
    }

    h3Elements[currentIndex]?.classList.add('visible');

    if (direction > 0) {
        scrollCount++;
    } else {
        if (scrollCount > 0) {
            scrollCount--;
        }
    }

    setTimeout(() => {
        canScroll = true;
    }, 1000);

    showScrollTimer();
}

// Fonction d'affichage du timer de défilement
function showScrollTimer() {
    const timerOverlay = document.createElement('div');
    timerOverlay.textContent = 'Scrolling...';
    timerOverlay.style.position = 'fixed';
    timerOverlay.style.top = '85%';
    timerOverlay.style.left = '50%';
    timerOverlay.style.transform = 'translate(-50%, -50%)';
    timerOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    timerOverlay.style.color = 'white';
    timerOverlay.style.padding = '10px 20px';
    timerOverlay.style.borderRadius = '5px';
    timerOverlay.style.zIndex = '1000';
    timerOverlay.style.fontSize = '1.5rem';
    document.body.appendChild(timerOverlay);

    setTimeout(() => {
        timerOverlay.remove();
    }, 1000);
}

/* Mode téléphone et navigation */

/* Bouton de mode téléphone */
const toggleModeButton = document.createElement('button');
toggleModeButton.id = 'toggleMode';
toggleModeButton.textContent = 'Mode téléphone';
document.body.appendChild(toggleModeButton);

// Barre de navigation pour le mode téléphone
const phoneNavigation = document.createElement('div');
phoneNavigation.id = 'phoneNavigation';
phoneNavigation.classList.add('hidden');
phoneNavigation.innerHTML = `
    <button class="prevBtn">Précédent</button>
    <button class="nextBtn">Suivant</button>
`;
document.body.appendChild(phoneNavigation);

// Fonction pour basculer entre le mode téléphone et l'interface classique
toggleModeButton.addEventListener('click', () => {
    const isHidden = phoneNavigation.classList.contains('hidden');
    if (isHidden) {
        phoneNavigation.classList.remove('hidden');
        toggleModeButton.textContent = 'Retour';
    } else {
        phoneNavigation.classList.add('hidden');
        toggleModeButton.textContent = 'Mode téléphone';
    }
});

// Actions des boutons Précédent et Suivant dans le mode téléphone
phoneNavigation.querySelector('.prevBtn').addEventListener('click', () => {
    handleScroll(-1);
});

phoneNavigation.querySelector('.nextBtn').addEventListener('click', () => {
    handleScroll(1);
});
