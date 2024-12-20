gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const content = document.querySelector('#content');

const simplex = new SimplexNoise();
for (let i = 0; i < 5000; i++) {
  const div = document.createElement('div');
  div.classList.add('circle');
  const n1 = simplex.noise2D(i * 0.003, i * 0.0033);
  const n2 = simplex.noise2D(i * 0.002, i * 0.001);
  const style = {
    transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
    boxShadow: `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .6)`
  };
  Object.assign(div.style, style);
  content.appendChild(div);
}
const Circles = document.querySelectorAll('.circle');

const scrollerSmoother = ScrollSmoother.create({
  content: content,
  wrapper: '#wrapper',
  smooth: 1,
  effects: false
});

const main = gsap.timeline({
  scrollTrigger: {
    scrub: .7,
    start: "top 25%",
    end: "bottom bottom"
  }
});
Circles.forEach(circle => {
  main.to(circle, {
    opacity: 1
  });
});

gsap.utils.toArray('.side-image').forEach((image, i) => {
  gsap.fromTo(
    image,
    {
      opacity: 0,
      y: 40,
    },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        start: "top 70%",
        end: "top top",
        scrub: 1,
        toggleActions: "play none none reverse",
      }
    }
  );
});
