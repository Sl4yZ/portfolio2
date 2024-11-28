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

window.addEventListener('wheel', (event) => {
    if (!canScroll) return;
    canScroll = false;

    const direction = event.deltaY > 0 ? 1 : -1;

    h3Elements[currentIndex]?.classList.remove('visible');

    let previousIndex = currentIndex;
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= h3Elements.length) currentIndex = h3Elements.length - 1;

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
});

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
