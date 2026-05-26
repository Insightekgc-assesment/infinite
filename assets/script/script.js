const carouselImages = document.querySelectorAll(
  '.header-carousel .carousel-item img'
);

let ticking = false;

function smoothParallax(){

    const scrollY = window.scrollY;

    carouselImages.forEach((img) => {

        /* Smooth Zoom */

        const scale =
        1 + Math.min(scrollY * 0.00035, 0.12);

        /* Slight Vertical Movement */

        const translateY =
        scrollY * 0.12;

        img.style.transform =
        `scale(${scale}) translateY(${translateY}px)`;
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