const elements = {
    titreSpans: document.querySelectorAll('h1 span'),
    titreSpans1: document.querySelectorAll('h3 span'),
    logo: document.querySelector('.logo'),
    l1: document.querySelector('.l1'),
    l2: document.querySelector('.l2'),
    link: document.querySelector('.links'),
};
window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .staggerFrom(elements.titreSpans, 1, { top: -50, opacity: 0, ease: "power2.out" }, 0.3)
    .staggerFrom(elements.titreSpans1, 1, { top: -50, opacity: 0, ease: "power2.out" }, 0.3)
    .from(elements.l1, 1, { width: 0, ease: "power2.out" }, '-=1')
    .from(elements.l2, 1, { width: 0, ease: "power2.out" }, '-=1')
    .from(elements.link, 0.1, { opacity: 0 }, '-=1')
    .from(elements.link, 1, { width: 0, ease: "power2.out" }, '-=1')
    .from(elements.logo, 0.4, { scale: 0, ease: "power2.out" }, '-=2')
    

    TL.play();
})
