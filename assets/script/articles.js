// Save as articles.js
(function () {
  function el(tag, attrs) {
    const n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === 'class') n.className = attrs[k];
        else if (k === 'html') n.innerHTML = attrs[k];
        else n.setAttribute(k, attrs[k]);
      });
    }
    return n;
  }

  function getWrap() {
    return {
      featuredWrap: document.getElementById('featuredWrap'),
      filterContainer: document.getElementById('filterContainer'),
      articlesGrid: document.getElementById('storiesGrid'),
      error: document.getElementById('articlesError'),
    };
  }

  let articlesData = [];

  async function fetchArticlesJson() {
    const res = await fetch('/assets/script/articles.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Invalid articles JSON format.');
    return data;
  }

  function sanitizeArticle(a) {
    return {
      slug: String(a.slug || '').trim(),
      title: String(a.title || '').trim(),
      category: String(a.category || '').trim(),
      author: String(a.author || '').trim(),
      minutes: Number.isFinite(a.minutes) ? a.minutes : Number(a.minutes) || 0,
      featured: a.featured === true,
      thumbnail: a.thumbnail || '',
      hero: a.hero || a.thumbnail || '',
      excerpt: a.excerpt || '',
      content: a.content || '',
    };
  }

  function injectStyles() {
    // Styling is handled in /assets/stylesheet/style.css.
    // Keeping this empty injection avoids layout shifts if the function is called.
    if (document.getElementById('articles-inline-styles')) return;
    const style = document.createElement('style');
    style.id = 'articles-inline-styles';
    style.textContent = ``;
    document.head.appendChild(style);
  }

  function renderFeatured(container, article) {
    if (!container || !article) return;
    container.innerHTML = '';
    const slug = encodeURIComponent(article.slug);
    const hero = article.hero || article.thumbnail || '';
    container.appendChild(
      el('div', {
        class: 'col-12',
        html: `
          <div class="articles-featured-card">
            <div class="articles-featured-grid">
              <div class="articles-featured-media" aria-hidden="true">
                <img src="${hero}" alt="Featured article" loading="eager" />
              </div>
              <div class="articles-featured-body">
                <div class="articles-kicker">${article.category || ''}</div>
                <h2 class="articles-featured-title">${article.title || ''}</h2>
                <div class="articles-meta">
                  <span class="articles-author">${article.author || ''}</span>
                  <span class="articles-dot">•</span>
                  <span class="articles-time">${article.minutes || 0} min read</span>
                </div>
                <div class="articles-featured-cta">
                  <a class="btn btn-primary" href="/pages/article.html?slug=${slug}">Read Article</a>
                  <a class="btn btn-outline-primary" href="#" data-explore-category="${(article.category || '').replace(/"/g, '"')}">Explore Categories</a>
                </div>
              </div>
            </div>
          </div>
        `,
      })
    );
    // Category explore action is handled by filter pills in this implementation.
  }

  function getCategoriesFromArticles(data) {
    const set = new Set();
    data.forEach((a) => {
      if (a && a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set).sort()];
  }

  function renderFilters(container, categories, onPick) {
    if (!container) return;
    container.innerHTML = '';
    categories.forEach((c, idx) => {
      const btn = el('button', {
        type: 'button',
        class: `articles-pill${idx === 0 ? ' active' : ''}`,
        'data-category': c,
        html: c,
      });
      btn.addEventListener('click', () => {
        const pills = container.querySelectorAll('.articles-pill');
        pills.forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        onPick(c);
      });
      container.appendChild(btn);
    });
  }

  function renderCards(grid, cards) {
    if (!grid) return;
    grid.innerHTML = '';
    cards.forEach((c) => {
      const slug = encodeURIComponent(c.slug);
      const hero = c.thumbnail || c.hero || '';
      const card = el('div', {
        class: 'col-md-6 col-lg-4 articles-card',
        html: `
          <a class="articles-card-inner" href="/pages/article.html?slug=${slug}" aria-label="${c.title || ''}">
            <div class="articles-card-thumb">
              <img src="${hero}" alt="${c.title || ''}" loading="lazy" />
              <div class="articles-card-gradient"></div>
              <div class="articles-card-badge">${c.category || ''}</div>
            </div>
            <div class="articles-card-body">
              <h3 class="articles-card-title">${c.title || ''}</h3>
              <div class="articles-card-meta">
                <span class="articles-author">${c.author || ''}</span>
                <span class="articles-dot">•</span>
                <span class="articles-time">${c.minutes || 0} min</span>
              </div>
            </div>
          </a>
        `,
      });
      grid.appendChild(card);
    });
  }

  function showError(errorEl, message) {
    if (!errorEl) return;
    errorEl.style.display = 'block';
    errorEl.textContent = message;
  }

  async function start() {
    injectStyles();
    const { featuredWrap, filterContainer, articlesGrid, error } = getWrap();
    try {
      const raw = await fetchArticlesJson();
      articlesData = raw.map(sanitizeArticle).filter((a) => a.slug && a.title);
      if (!articlesData.length) {
        renderCards(articlesGrid, []);
        renderFeatured(featuredWrap, null);
        showError(error, 'No articles available right now.');
        return;
      }
      const featured = articlesData.find((a) => a.featured === true) || articlesData[0];
      renderFeatured(featuredWrap, featured);
      const categories = getCategoriesFromArticles(articlesData);
      function applyFilter(category) {
        const picked = category === 'All' ? articlesData : articlesData.filter((a) => a.category === category);
        renderCards(articlesGrid, picked);
      }
      renderFilters(filterContainer, categories, applyFilter);
      applyFilter('All');
    } catch (e) {
      console.error(e);
      if (featuredWrap) featuredWrap.innerHTML = '';
      if (articlesGrid) articlesGrid.innerHTML = '';
      showError(error, 'Unable to load articles at the moment.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();