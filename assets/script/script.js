document.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const images = document.querySelectorAll('.header-carousel .carousel-item img');

    images.forEach((img) => {
        const scale = 1 + (scrollY * 0.0015);

        if (scale <= 1.4) {
            img.style.transform = `scale(${scale})`;
        }
    });
});