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



//articles pages

// Save as scripts.js
async function loadComponent(url, id) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
    if (window.AOS) AOS.refresh();
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  loadComponent('/components/navbar.html', 'navbar-placeholder');
  loadComponent('/components/footer.html', 'footer-placeholder');
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
});

window.addEventListener('load', () => {
  if (window.AOS) AOS.refreshHard();
});