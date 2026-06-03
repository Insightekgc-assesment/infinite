document.addEventListener(
  'scroll',
  function () {

    const scrollY = window.scrollY;
    const images = document.querySelectorAll(
      '.header-carousel .carousel-item img',
    );


  images.forEach((img) => {
    const scale = 1 + scrollY * 0.0015;
    if (scale <= 1.4) {
      img.style.transform = `scale(${scale})`;
    }
  });
});

// =========================================================
// Common Utilities Section
// =========================================================

const founderProfiles = [
  { name: 'Ava Clarke', role: 'Founder & CEO', company: 'Helio Ventures', category: 'Founder Interview' },
  { name: 'Noah Reed', role: 'Co-founder & Chief Product Officer', company: 'Nexera', category: 'Startup Journey' },
  { name: 'Maya Reeves', role: 'Founder & Managing Partner', company: 'Lumen Labs', category: 'Leadership Profile' },
  { name: 'Ezra Chen', role: 'Founder & Head of Growth', company: 'Pulse Forge', category: 'Founder Journey' },
  { name: 'Sofia Lane', role: 'Founder & COO', company: 'Atlas Collective', category: 'Founder Interview' },
  { name: 'Miles Everett', role: 'Founder & Creative Director', company: 'Verve Studio', category: 'Leadership Profile' },
  { name: 'Aria Chen', role: 'Founder & CEO', company: 'Rift Labs', category: 'Startup Journey' },
  { name: 'Noah Kline', role: 'Founder & CTO', company: 'Nimbus AI', category: 'Founder Interview' },
  { name: 'Lena Brooks', role: 'Founder & Chief Strategy Officer', company: 'Horizon Loop', category: 'Founder Journey' },
  { name: 'Oliver Dale', role: 'Founder & Head of Operations', company: 'Seedwell', category: 'Leadership Profile' },
];

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function slugify(input) {
  return (input || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const DOM_SELECTORS = {
  navbarPlaceholder: 'navbar-placeholder',
  footerPlaceholder: 'footer-placeholder',
  featuredCollection: '.featured-collection',
};

// =========================================================
// Global Initialization Section
// =========================================================

let AOS_INITIALIZED = false;

function initAOSOnce() {
  if (AOS_INITIALIZED) return;
  if (!window.AOS) return;

  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    mirror: false,
    offset: 120,
    delay: 0,
    disable: function () {
      return window.innerWidth < 768;
    },
  });

  AOS_INITIALIZED = true;
}

async function loadComponent(url, placeholderId, callback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
      placeholder.innerHTML = html;
      if (window.AOS) AOS.refresh();
      if (callback) callback();
    }
  } catch (err) {
    console.error('Error loading component:', err);
  }
}

function getCardsJsonUrl() {
  // Resolve cards.json relative to the current HTML file location.
  // Requirement: when on pages/* (including nested), use "../cards.json".
  // Avoid fragile folder-name assumptions by checking the current file's relative directory depth.
  // In this project: all pages that use this script live under /pages/ (including pages/article*, pages in subfolders).

  const path = document.location.pathname || '';
  const parts = path.split('/').filter(Boolean);
  const hasPagesRoot = parts[0] === 'pages' || parts.includes('pages');

  // For /pages/* => ../cards.json; for root => cards.json
  return hasPagesRoot ? '../cards.json' : 'cards.json';
}



async function injectNavbarFooter() {
  const pathFromPages = '../components';
  const pathFromRoot = 'components';

  const isInPages = document.location.pathname.includes('/pages/');
  const base = isInPages ? pathFromPages : pathFromRoot;

  await Promise.all([
    loadComponent(`${base}/navbar.html`, DOM_SELECTORS.navbarPlaceholder),
    loadComponent(`${base}/footer.html`, DOM_SELECTORS.footerPlaceholder),
  ]);
}

function refreshAOSHardSafe() {
  if (window.AOS && typeof AOS.refreshHard === 'function') AOS.refreshHard();
  else if (window.AOS) AOS.refresh();
}

// =========================================================
// Feature Modules
// =========================================================

// -------------------------------
// Article detail page logic
// -------------------------------

async function loadCardDetail() {
  const slug = getQueryParam('slug');

  const detailImage = document.getElementById('detailImage');
  const detailCategory = document.getElementById('detailCategory');
  const detailSubtitle = document.getElementById('detailSubtitle');
  const detailHeading = document.getElementById('detailHeading');
  const detailArticleDetail = document.getElementById('detailArticleDetail');
  const detailArticle = document.getElementById('detailArticle');
  const detailAuthor = document.getElementById('detailAuthor');
  const detailDate = document.getElementById('detailDate');
  const detailTags = document.getElementById('detailTags');
  const detailMediaCaption = document.getElementById('detailMediaCaption');
  const detailSections = document.getElementById('detailSections');
  const detailQuote = document.getElementById('detailQuote');
  const detailStats = document.getElementById('detailStats');
  const detailHighlights = document.getElementById('detailHighlights');
  const detailConclusion = document.getElementById('detailConclusion');
  const detailError = document.getElementById('detailError');
  const detailPage = document.getElementById('detailPage');

  if (!detailImage || !detailCategory || !detailHeading || !detailArticle) return;

  try {
    const response = await fetch(getCardsJsonUrl());
    const cards = await response.json();

    if (window.AOS) AOS.refresh();

    const card = slug ? cards.find((c) => slugify(c.name) === decodeURIComponent(slug)) : null;
    if (!card) {
      throw new Error(`Article not found for slug=${slug || 'missing'}`);
    }

  const rawImage = card.image || '';
  let normalizedImage = rawImage;
  // Support both conventions:
  // - JSON stores "article/..." for images relative to project root
  // - pages/article.html uses "articleImage/..." for the hero image assets
  if (rawImage.startsWith('article/')) normalizedImage = `../${rawImage}`;
  else if (rawImage.startsWith('articleImage/')) normalizedImage = rawImage;
  


    detailImage.src =
      normalizedImage ||
      `https://picsum.photos/seed/${encodeURIComponent(card.name || 'detail')}/900/1100`;
    detailImage.alt = card.name || 'Founder';

    detailCategory.textContent = card.storyLabel || 'Founder Interview';
    detailSubtitle.textContent = '';
    detailHeading.textContent = card.title || card.name || '';
    detailAuthor.textContent = '';

    detailDate.textContent = card.date || '';
    if (!detailDate.textContent) detailDate.textContent = '—';

    detailArticleDetail.textContent = card.story ? card.story.split(/\r?\n/)[0].trim() : '';

    const renderDocText = async () => {
      if (!card.doc) {
        detailArticle.textContent = card.story || card.title || '';
        return;
      }

      try {
        const rawDoc = card.doc || '';
        const normalizedDoc = rawDoc.startsWith('article/') ? `../${rawDoc}` : rawDoc;

        const docResponse = await fetch(normalizedDoc);
        const arrayBuffer = await docResponse.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        detailArticle.innerHTML = result.value || card.story || card.title || '';
      } catch (docError) {
        detailArticle.textContent = card.story || card.title || '';
        console.warn('Unable to load DOCX content:', docError);
      }
    };

    await renderDocText();

    const rawDocForLink = card.doc || '';
    const normalizedDocForLink = rawDocForLink.startsWith('article/') ? `../${rawDocForLink}` : rawDocForLink;

    if (card.doc) {
      detailMediaCaption.innerHTML = `<a href="${normalizedDocForLink}" target="_blank" rel="noopener">Download the interview document</a>`;
    } else {
      detailMediaCaption.textContent = card.caption || `${card.name || '—'}`;
    }

    const tags = Array.isArray(card.tags) && card.tags.length ? card.tags : [card.storyLabel || 'Founder Story'];

    detailTags.innerHTML = tags
      .filter((t) => t)
      .map((tag) => `<span class="detail-tag">${tag}</span>`)
      .join('');

    if (!card.doc) {
      const sections = card.sections || [{ title: 'Story', content: card.story || card.title || '' }];
      detailSections.innerHTML = sections
        .map(
          (section) => `
            <section class="story-section">
              <h3>${section.title}</h3>
              <p>${section.content}</p>
            </section>
          `,
        )
        .join('');
    } else {
      detailSections.innerHTML = '';
    }

    if (detailQuote) detailQuote.classList.add('d-none');
    if (detailStats) detailStats.innerHTML = '';
    if (detailHighlights) detailHighlights.innerHTML = '';
    if (detailConclusion) detailConclusion.textContent = '';

    document.title = `${card.name || 'Founder'} · ${card.title || ''}`.trim();
    if (window.AOS) AOS.refresh();
  } catch (error) {
    if (detailPage) detailPage.classList.add('d-none');
    if (detailError) {
      detailError.textContent =
        'Unable to load article detail. Please make sure the article ID is valid and the JSON file is available.';
      detailError.classList.remove('d-none');
    }
    console.error(error);
  }
}

// -------------------------------
// Article listing (hero + cards + pagination) logic
// -------------------------------

function getPreviewText(story, maxChars = 120) {
  if (!story) return 'A founder narrative that reveals leadership, momentum, and clarity.';
  const plain = story.replace(/\s+/g, ' ').trim();
  if (plain.length <= maxChars) return plain;
  return plain.slice(0, maxChars).replace(/\s+$/, '') + '…';
}

function enrichCard(card, index) {
  const imageSeed = encodeURIComponent(card.name || `story-${index}`);
  const id = index + 1;

  const rawImage = card.image || '';
  let normalizedImage = rawImage;
  // Support both conventions:
  // - JSON stores "article/..." for images relative to project root
  // - pages/article.html uses "articleImage/..." for the hero image assets
  if (rawImage.startsWith('article/')) normalizedImage = `../${rawImage}`;
  else if (rawImage.startsWith('articleImage/')) normalizedImage = rawImage;


  return {
    ...card,
    id,
    delay: (index % 4) * 100,
    image: normalizedImage || `https://picsum.photos/seed/${imageSeed}/600/420`,
    storyLabel: card.storyLabel || 'Founder Interview',
    storyPreview: getPreviewText(card.story),
  };
}

function renderHeroAndCardsFromState(state) {
  const {
    cards,
    heroId,
    cardsPerPage,
    currentPage,
    heroImage,
    heroCategory,
    heroHeading,
    heroPreview,
    heroFounderName,
    heroFounderRole,
    cardGrid,
    paginationNav,
  } = state;

  const heroCard = cards.find((c) => c.id === heroId) || cards[0];
  heroImage.src = heroCard.image;
  heroImage.alt = heroCard.name;
  heroCategory.textContent = heroCard.storyLabel;
  heroHeading.textContent = heroCard.title || `Founder story from ${heroCard.name}`;
  heroPreview.textContent = heroCard.storyPreview;
  heroFounderName.textContent = heroCard.name;
  heroFounderRole.textContent = 'Founder';

  const filtered = cards.filter((c) => c.id !== heroId);
  const start = (currentPage - 1) * cardsPerPage;
  const visibleCards = filtered.slice(start, start + cardsPerPage);

  cardGrid.innerHTML = visibleCards
    .map(
      (card) => `
      <article class="story-card founder-card story-card-medium" style="background-image: url('${card.image}');" data-aos="fade-up" data-aos-delay="${card.delay}">
        <div class="story-card-inner">
          <div class="founder-chip">
            <span class="story-category">${card.storyLabel}</span>
          </div>
          <h3 class="founder-name">${card.name}</h3>
          <h4 class="story-headline">${card.title}</h4>
          <a href="./article-detail.html?slug=${slugify(card.name)}" class="story-cta">Read story</a>
        </div>
      </article>
    `,
    )
    .join('');

  if (window.AOS) AOS.refresh();

  const totalPages = Math.max(1, Math.ceil(filtered.length / cardsPerPage));
  paginationNav.innerHTML = '';

  const createPageItem = (label, page, disabled = false, active = false) => {
    const li = document.createElement('li');
    li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`;
    li.innerHTML = `
      <button class="page-link" type="button" ${disabled ? 'tabindex="-1" aria-disabled="true"' : ''}>
        ${label}
      </button>
    `;

    if (!disabled) {
      li.addEventListener('click', () => {
        state.currentPage = page;
        renderHeroAndCardsFromState(state);
        const featuredTop = document.querySelector(DOM_SELECTORS.featuredCollection)?.offsetTop;
        if (typeof featuredTop === 'number') {
          window.scrollTo({ top: featuredTop - 80, behavior: 'smooth' });
        }
      });
    }

    return li;
  };

  paginationNav.appendChild(createPageItem('Previous', state.currentPage - 1, state.currentPage === 1));

  for (let page = 1; page <= totalPages; page += 1) {
    paginationNav.appendChild(createPageItem(page, page, false, page === state.currentPage));
  }

  paginationNav.appendChild(createPageItem('Next', state.currentPage + 1, state.currentPage === totalPages));
}

async function loadArticleListing() {
  const heroImage = document.getElementById('heroImage');
  const heroCategory = document.getElementById('heroCategory');
  const heroHeading = document.getElementById('heroHeading');
  const heroPreview = document.getElementById('heroPreview');
  const heroFounderName = document.getElementById('heroFounderName');
  const heroFounderRole = document.getElementById('heroFounderRole');
  const cardGrid = document.getElementById('cardGrid');
  const paginationNav = document.getElementById('paginationNav');

  // if elements don't exist, it's not the listing page
  if (!heroImage || !cardGrid || !paginationNav) return;

  const state = {

    cards: [],
    heroId: null,
    cardsPerPage: 9,
    currentPage: 1,
    heroImage,
    heroCategory,
    heroHeading,
    heroPreview,
    heroFounderName,
    heroFounderRole,
    cardGrid,
    paginationNav,
  };

  try {
    const response = await fetch(getCardsJsonUrl());
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const loadedCards = await response.json();

    state.cards = loadedCards.map(enrichCard);

    if (state.cards.length > 0) {
      const heroCard =
        state.cards.find((c) => c.storyLabel && c.storyLabel.toLowerCase() !== 'other') || state.cards[0];
      state.heroId = heroCard.id;
    }

    renderHeroAndCardsFromState(state);
  } catch (error) {
    cardGrid.innerHTML =
      '<div class="col-12"><p class="text-danger">Unable to load card data. Please run this page from a local server.</p></div>';
    console.error('Error loading cards.json:', error);
  }
}

// =========================================================
// Global event listeners (exactly one each)
// =========================================================

window.addEventListener('load', () => {
  refreshAOSHardSafe();
});

document.addEventListener('DOMContentLoaded', () => {
  initAOSOnce();

  // Navbar/Footer injection (only one flow)
  injectNavbarFooter().then(() => {
    // Article detail or listing are mutually exclusive per page DOM.
    // Both are safe no-ops if their required DOM nodes are missing.
    loadCardDetail();
    loadArticleListing();

    if (window.AOS) AOS.refresh();
  });
});

  