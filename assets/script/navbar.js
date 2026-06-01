(function () {
  const SELECTORS = {
    navbar: '#main-navbar',
    hamburger: '#hamburger',
    sidebar: '#mobile-sidebar',
    overlay: '#inf-overlay',
    closeBtn: '#close-sidebar',
    desktopMenu: '#desktop-menu',
    mobileMenuList: '#mobile-menu-list',
    
    // Updated Custom Selectors
    navLinks: '.inf-nav-link',
    desktopDropdowns: '#desktop-menu .inf-dropdown',
    mobileDropdownToggles: '.inf-mobile-dropdown-toggle',
    dropdownMenus: '.inf-dropdown-menu',
    dropdownToggles: '.inf-dropdown-toggle'
  };

  function $(sel, root = document) {
    return root.querySelector(sel);
  }

  function $all(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  // Toggle Sidebar
  function openSidebar() {
    const sidebar = $(SELECTORS.sidebar);
    const overlay = $(SELECTORS.overlay);
    if (!sidebar || !overlay) return;

    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    const hamburger = $(SELECTORS.hamburger);
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    const sidebar = $(SELECTORS.sidebar);
    const overlay = $(SELECTORS.overlay);
    if (!sidebar || !overlay) return;

    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';

    const hamburger = $(SELECTORS.hamburger);
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }

  // Highlight Active Link
 function highlightActiveLink() {
  const links = $all(SELECTORS.navLinks);
  const currentPath = window.location.pathname.split('/').pop();

  links.forEach((link) => {
    const href = (link.getAttribute('href') || '').split('/').pop();

    // reset first
    link.classList.remove('active');

    if (href === currentPath) {
      link.classList.add('active');

      // ALSO highlight parent dropdown (if exists)
      const parentDropdown = link.closest('.inf-dropdown');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.inf-dropdown-toggle');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
}

  // Desktop Dropdown (Hover)
  function initDesktopDropdowns() {
    const desktopDropdowns = $all(SELECTORS.desktopDropdowns);

    desktopDropdowns.forEach((li) => {
      const menu = li.querySelector(SELECTORS.dropdownMenus);
      const toggle = li.querySelector(SELECTORS.dropdownToggles);
      if (!menu || !toggle) return;

      toggle.setAttribute('aria-expanded', 'false');

      li.addEventListener('mouseenter', () => {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        toggle.setAttribute('aria-expanded', 'true');
      });

      li.addEventListener('mouseleave', () => {
        menu.style.opacity = '';
        menu.style.visibility = '';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mobile Dropdown (Click)
  function initMobileDropdowns() {
    const mobileToggles = $all(SELECTORS.mobileDropdownToggles);

    mobileToggles.forEach((btn) => {
      const dropdown = btn.closest('.inf-dropdown');
      if (!dropdown) return;

      const menu = dropdown.querySelector(SELECTORS.dropdownMenus);
      if (!menu) return;

      menu.style.display = 'none'; // Start closed

      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const isOpen = menu.style.display === 'block';
        menu.style.display = isOpen ? 'none' : 'block';

        // Close other open menus
        $all('#mobile-menu-list .inf-dropdown-menu').forEach((m) => {
          if (m !== menu) m.style.display = 'none';
        });

        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  // Scroll Effect
  function initScrollEffect() {
    const navbar = $(SELECTORS.navbar);
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }

  // Mobile Menu Functionality
  function initMobile() {
    const hamburger = $(SELECTORS.hamburger);
    const sidebar = $(SELECTORS.sidebar);
    const overlay = $(SELECTORS.overlay);
    const closeBtn = $(SELECTORS.closeBtn);

    if (!hamburger || !sidebar || !overlay || !closeBtn) return;

    hamburger.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    // ESC Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSidebar();
    });

    // Close sidebar when clicking a link
    const mobileMenuList = $(SELECTORS.mobileMenuList);
    if (mobileMenuList) {
      mobileMenuList.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'A') {
          closeSidebar();
        }
      });
    }
  }

  // Initialize Everything
  function initWhenReady() {
    const navbar = $(SELECTORS.navbar);
    if (!navbar) return false;

    initScrollEffect();
    initMobile();
    initDesktopDropdowns();
    initMobileDropdowns();
    highlightActiveLink();

    return true;
  }

  // Run immediately or wait for DOM
  if (!initWhenReady()) {
    const mo = new MutationObserver(() => {
      if (initWhenReady()) mo.disconnect();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

})();