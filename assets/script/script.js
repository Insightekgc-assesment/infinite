const carouselImages = document.querySelectorAll(
  '.header-carousel .carousel-item img'
);

let ticking = false;

function smoothParallax(){

    const scrollY = window.scrollY;

    carouselImages.forEach((img) => {

        /* Very subtle zoom */

        const scale =
        1 + Math.min(scrollY * 0.00008, 0.03);

        /* Very slight movement */

        const translateY =
        scrollY * 0.04;

        img.style.transform =
        `scale(${scale}) translate3d(0, ${translateY}px, 0)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {

    if(!ticking){

        window.requestAnimationFrame(() => {

            smoothParallax();

        });

        ticking = true;
    }
});