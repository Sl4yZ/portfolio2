const titreSpans = document.querySelectorAll('h1 span');
const titreSpans2 = document.querySelectorAll('h3 span');
const h3Elements = document.querySelectorAll('.h3-wrapper h3');
const btns = document.querySelectorAll('.btn-first');
const logo = document.querySelector('.logo');
const medias = document.querySelectorAll('.bulle');
const l1 = document.querySelector('.l1');
const l2 = document.querySelector('.l2');
const link = document.querySelector('.links');
let currentIndex = 0;

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
    const direction = event.deltaY > 0 ? 1 : -1;

    h3Elements[currentIndex].classList.remove('visible');

    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= h3Elements.length) currentIndex = h3Elements.length - 1;

    h3Elements[currentIndex].classList.add('visible');

    if (currentIndex === 1) {
        document.body.style.backgroundPosition = 'right center';
    } else if (currentIndex === 0) {
        document.body.style.backgroundPosition = 'left center';
    }
});
