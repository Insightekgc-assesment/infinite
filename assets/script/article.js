// Save as article.js
(function () {
  function getWrap() {
    return {
      nav: document.getElementById('articleNav'),
      hero: document.getElementById('articleHero'),
      content: document.getElementById('articleContent'),
      relatedWrap: document.getElementById('relatedWrap'),
      relatedGrid: document.getElementById('relatedGrid'),
      continueWrap: document.getElementById('continueWrap'),
      continueGrid: document.getElementById('continueGrid'),
      error: document.getElementById('articleError'),
    };
  }

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

  function getSlugFromUrl() {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get('slug');
    } catch (e) {
      return null;
    }
  }

  async function fetchArticlesJson() {
    const res = await fetch('/assets/script/articles.json', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  }

  function injectStyles() {
    if (document.getElementById('article-inline-styles')) return;
    const style = document.createElement('style');
    style.id = 'article-inline-styles';
    style.textContent = `
      /* Your styles from the style tag in your code */
    `;
    document.head.appendChild(style);
  }

  function renderHero(heroContainer, article) {
    if (!heroContainer || !article) return;
    heroContainer.innerHTML = '';
    heroContainer.appendChild(
      el('div', {
        class: 'article-hero-grid',
        html: `
          <div class="article-hero-media" aria-hidden="true">
            <img src="${article.hero || article.thumbnail || ''}" alt="${article.title || 'Article'}" loading="eager" />
          </div>
          <div class="article-hero-body">
            <div class="article-kicker">${article.category || ''}</div>
            <h1 class="article-title">${article.title || ''}</h1>
            <div class="article-meta">
              <span class="articles-author">${article.author || ''}</span>
              <span class="articles-dot">•</span>
              <span class="articles-time">${article.minutes || 0} min read</span>
            </div>
          </div>
        `,
      })
    );
  }

  function renderCardsRow(cards, gridEl, cardClassPrefix, getCardUrl, badgeTextKey) {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    cards.forEach((a) => {
      const col = el('div', { class: 'col-md-6 col-lg-4 related-card' });
      const href = getCardUrl(a);

      const link = el('a', {
        class: `${cardClassPrefix}-inner`,
        href,
        'aria-label': a.title || '',
      });

      link.innerHTML = `
        <div class="${cardClassPrefix}-thumb">
          <img src="${a.thumbnail || a.hero || ''}" alt="${a.title || ''}" loading="lazy" />
          <div class="${cardClassPrefix}-gradient"></div>
          <div class="${cardClassPrefix}-badge">${a[badgeTextKey] || ''}</div>
        </div>
        <div class="${cardClassPrefix}-body">
          <h3 class="${cardClassPrefix}-title">${a.title || ''}</h3>
          <div class="${cardClassPrefix}-meta">
            <span class="articles-author">${a.author || ''}</span>
            <span class="articles-dot">•</span>
            <span class="articles-time">${a.minutes || 0} min</span>
          </div>
        </div>
      `;

      col.appendChild(link);
      gridEl.appendChild(col);
    });
  }

  function renderRelated(article, relatedGrid, relatedWrap) {
    if (!relatedGrid || !relatedWrap) return;

    const sameCategory = article.category
      ? articlesData.filter((a) => a.slug !== article.slug && a.category === article.category)
      : [];

    const otherArticles = articlesData.filter((a) => a.slug !== article.slug && a.category !== article.category);

    const desired = 6;
    const related = [];
    const pushUnique = (arr) => {
      arr.forEach((x) => {
        if (!related.find((r) => r.slug === x.slug)) related.push(x);
      });
    };

    pushUnique(sameCategory);
    if (related.length < desired) pushUnique(otherArticles);

    const finalRelated = related.slice(0, desired);

    if (!finalRelated.length) {
      relatedWrap.style.display = 'none';
      relatedGrid.innerHTML = '';
      return;
    }

    relatedWrap.style.display = '';
    renderCardsRow(
      finalRelated,
      relatedGrid,
      'related-card',
      (a) => `/pages/article.html?slug=${encodeURIComponent(a.slug)}`,
      'category'
    );
  }

  function renderContinueReading(currentArticle, relatedGrid, wrapEl) {
    if (!wrapEl || !relatedGrid) return;

    const desired = 6;
    const others = articlesData.filter((a) => a.slug !== currentArticle.slug);
    const list = [];

    const sameCat = currentArticle.category
      ? others.filter((a) => a.category === currentArticle.category)
      : [];
    const rest = others.filter((a) => a.category !== currentArticle.category);

    sameCat.forEach((x) => list.push(x));
    if (list.length < desired) rest.forEach((x) => list.push(x));

    const finalList = list.slice(0, desired);

    if (!finalList.length) {
      wrapEl.style.display = 'none';
      return;
    }

    wrapEl.style.display = '';
    renderCardsRow(
      finalList,
      relatedGrid,
      'continue-card',
      (a) => `/pages/article.html?slug=${encodeURIComponent(a.slug)}`,
      'category'
    );
  }

  function renderNav(navEl, article, allArticles) {
    if (!navEl) return;

    const slug = article.slug;
    const idx = allArticles.findIndex((a) => a.slug === slug);
    const prev = idx > 0 ? allArticles[idx - 1] : null;
    const next = idx >= 0 && idx < allArticles.length - 1 ? allArticles[idx + 1] : null;

    const prevHref = prev ? `/pages/article.html?slug=${encodeURIComponent(prev.slug)}` : '#';
    const nextHref = next ? `/pages/article.html?slug=${encodeURIComponent(next.slug)}` : '#';

    const prevDisabled = !prev;
    const nextDisabled = !next;

    navEl.innerHTML = `
      <div class="article-nav-inner">
        <div class="article-nav-actions">
          <div class="article-nav-group">
            <button type="button" class="article-nav-btn" data-back="1">← Back to Articles</button>
          </div>
          <div class="article-nav-group">
            <a class="article-nav-btn" href="${prevHref}" ${prevDisabled ? 'aria-disabled="true" disabled' : ''} data-prev="1">← Previous</a>
            <a class="article-nav-btn" href="${nextHref}" ${nextDisabled ? 'aria-disabled="true" disabled' : ''} data-next="1">Next →</a>
          </div>
        </div>
      </div>
    `;

    const backBtn = navEl.querySelector('[data-back="1"]');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        try {
          sessionStorage.setItem('articlesScrollY', String(window.scrollY || 0));
        } catch (e) {}
        window.location.href = '/pages/articles.html';
      });
    }

    const prevLink = navEl.querySelector('[data-prev="1"]');
    if (prevLink && prevDisabled) {
      prevLink.addEventListener('click', (e) => e.preventDefault());
    }
    const nextLink = navEl.querySelector('[data-next="1"]');
    if (nextLink && nextDisabled) {
      nextLink.addEventListener('click', (e) => e.preventDefault());
    }
  }

  let articlesData = [];

  async function start() {
    injectStyles();
    const { nav, hero, content, relatedWrap, relatedGrid, continueGrid, continueWrap, error } = getWrap();
    const slug = getSlugFromUrl();
    if (!slug) {
      if (error) {
        error.style.display = '';
        error.textContent = 'Article not found (missing slug).';
      }
      return;
    }
    try {
      articlesData = await fetchArticlesJson();
      if (!Array.isArray(articlesData) || !articlesData.length) {
        throw new Error('No articles found in JSON.');
      }
      const article = articlesData.find((a) => a && a.slug === slug);
      if (!article) {
        if (error) {
          error.style.display = '';
          error.textContent = 'Article not found for this slug.';
        }
        return;
      }
      if (relatedWrap) relatedWrap.style.display = 'none';
      if (continueWrap) continueWrap.style.display = 'none';

      renderHero(hero, article);
      if (content) {
        content.innerHTML = `${article.content || ''}`;
      }
      renderNav(nav, article, articlesData);
      renderRelated(article, relatedGrid, relatedWrap);
      renderContinueReading(article, continueGrid, continueWrap);

      try {
        const y = sessionStorage.getItem('articlesScrollY');
        if (y !== null) {
          sessionStorage.removeItem('articlesScrollY');
          window.scrollTo(0, Number(y) || 0);
        }
      } catch (e) {}

      if (window.AOS) AOS.refreshHard();

    } catch (e) {
      console.error(e);
      if (error) {
        error.style.display = '';
        error.textContent = 'Unable to load the article right now. Please try again later.';
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();