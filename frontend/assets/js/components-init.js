// Populate component placeholders after components are loaded
import { fetchCategories, fetchTrendingNews } from './api-adapter.js';

const populateSidebar = async () => {
  try {
    const [cats, trending] = await Promise.all([fetchCategories(), fetchTrendingNews()]);

    const catsEl = document.getElementById('sidebar-categories');
    if (catsEl && Array.isArray(cats)) {
      catsEl.innerHTML = cats
        .map((c) => `<li><a href="/category.html?slug=${c.slug}">${c.name}</a></li>`)
        .join('');
    }

    const trendingEl = document.getElementById('sidebar-trending');
    if (trendingEl && Array.isArray(trending)) {
      trendingEl.innerHTML = trending
        .map(
          (t, i) => `
            <li>
              <a href="/news-detail.html?id=${t.id}">${String(i + 1).padStart(2, '0')}. ${t.title}</a>
            </li>
          `
        )
        .join('');
    }
  } catch (err) {
    console.warn('populateSidebar failed', err);
  }
};

const wireGlobalSearch = () => {
  const form = document.getElementById('global-search-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    // allow normal submit to /search.html?q= but ensure encoding
    // if user presses enter, browser will submit; nothing else needed
  });
};

const onReady = () => {
  populateSidebar();
  wireGlobalSearch();
};

// If components are already ready, run immediately; otherwise listen for event
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // components may not be loaded yet; listen for components:ready
  window.addEventListener('components:ready', onReady, { once: true });
} else {
  window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('components:ready', onReady, { once: true });
  });
}
