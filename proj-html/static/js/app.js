document.addEventListener('DOMContentLoaded', () => {

    const elements = {
        titreSpans: document.querySelectorAll('h1 span'),
        logo: document.querySelector('.logo'),
        medias: document.querySelectorAll('.bulle'),
        l1: document.querySelector('.l1'),
        l2: document.querySelector('.l2'),
        link: document.querySelector('.links'),
        contents: document.querySelectorAll('.contents'),
        scrollTopButton: document.querySelector('.scroll'),
    };

    const TL = gsap.timeline({ paused: true });

    TL
        .staggerFrom(elements.titreSpans, 1, { top: -50, opacity: 0, ease: "power2.out" }, 0.3)
        .from(elements.l1, 1, { width: 0, ease: "power2.out" }, '-=2')
        .from(elements.l2, 1, { width: 0, ease: "power2.out" }, '-=2')
        .from(elements.link, 0.1, { opacity: 0 }, '-=2')
        .from(elements.link, 1, { width: 0, ease: "power2.out" }, '-=2')
        .from(elements.logo, 0.4, { scale: 0, ease: "power2.out" }, '-=2')
        .staggerFrom(elements.medias, 1, { right: -200, ease: "power2.out" }, 0.3, '-=1');

    TL.play();

    elements.contents.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const targetURL = this.getAttribute('href');
            console.log('Redirection vers :', targetURL);
            window.location.href = targetURL;
        });
    });

    if (elements.scrollTopButton) {
        elements.scrollTopButton.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelector('#top').scrollIntoView({
                behavior: 'smooth',
            });
        });
    }
});
