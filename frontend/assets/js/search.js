import { initComponents, getQueryParam } from './app.js';
import { searchNews } from './api-adapter.js';

const renderResult = (a) => `
  <div class="result-item">
    <span class="result-category">${a.category_slug.toUpperCase()}</span>
    <h3 class="result-title"><a href="/news-detail.html?id=${a.id}">${a.title}</a></h3>
    <p class="result-excerpt">${a.excerpt}</p>
    <div class="result-meta">
      <span><i class="far fa-clock"></i> ${new Date(a.date).toLocaleString()}</span>
      <span><i class="far fa-user"></i> By ${a.author}</span>
      <span><i class="far fa-eye"></i> ${a.views} views</span>
    </div>
  </div>
`;

const init = async () => {
  await initComponents();
  const q = getQueryParam('q') || document.getElementById('search-query')?.textContent || '';
  const query = (q || '').replace(/"/g, '').trim();
  const start = performance.now();
  const results = await searchNews(query);
  const end = performance.now();

  const resultsContainer = document.getElementById('search-results');
  const queryEl = document.getElementById('search-query');
  const countEl = document.getElementById('search-count');
  const timeEl = document.getElementById('search-time');

  if (queryEl) queryEl.textContent = query ? `"${query}"` : '""';
  if (countEl) countEl.textContent = results.length;
  if (timeEl) timeEl.textContent = ((end - start) / 1000).toFixed(2);

  if (!resultsContainer) return;
  if (!results || results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }
  resultsContainer.innerHTML = results.map(renderResult).join('');
};

document.addEventListener('DOMContentLoaded', init);
