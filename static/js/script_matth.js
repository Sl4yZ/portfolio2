const link = document.querySelector('.links')
const s1 = document.querySelector('.s1')

window.addEventListener('load', () => {

    const TL = gsap.timeline({paused: true});

    TL
    .from(link, 1, {width: 0, ease: "power2.out"})
    .from(s1, 2, {width: 0, ease: "power2.out"}, "-=1")
    

    TL.play();
})