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

let rawResults = [];
const pageSize = 5;

const readFilters = () => {
  const selectedCategories = Array.from(document.querySelectorAll('#category-filters input[type="checkbox"]:checked')).map(i => i.parentElement.textContent.trim().toLowerCase());
  const from = document.getElementById('date-from')?.value || '';
  const to = document.getElementById('date-to')?.value || '';
  const sort = document.getElementById('sort-select')?.value || 'relevance';
  const selectedTypes = Array.from(document.querySelectorAll('#type-filters input[type="checkbox"]:checked')).map(i => i.value);
  return { selectedCategories, from, to, sort, selectedTypes };
};

const applyFilters = (items) => {
  const { selectedCategories, from, to, sort, selectedTypes } = readFilters();
  let out = items.slice();

  // Category filter (map label to slug-ish by lowercasing)
  if (selectedCategories.length > 0 && selectedCategories.length !== document.querySelectorAll('#category-filters input[type="checkbox"]').length) {
    out = out.filter(it => selectedCategories.includes(it.category_slug.toLowerCase()) || selectedCategories.includes(it.category_slug));
  }

  // Date range
  if (from) {
    const fromTs = new Date(from).getTime();
    out = out.filter(it => new Date(it.date).getTime() >= fromTs);
  }
  if (to) {
    const toTs = new Date(to).getTime();
    out = out.filter(it => new Date(it.date).getTime() <= toTs + 24*60*60*1000);
  }

  // Content type - our mock data uses articles only, keep hook
  if (selectedTypes.length > 0 && !selectedTypes.includes('article')) {
    out = out.filter(it => false); // no matches for non-articles in mock
  }

  // Sort
  if (sort === 'newest') out.sort((a,b) => new Date(b.date) - new Date(a.date));
  else if (sort === 'oldest') out.sort((a,b) => new Date(a.date) - new Date(b.date));
  else if (sort === 'popular') out.sort((a,b) => (b.views||0) - (a.views||0));

  return out;
};

const renderPagination = (totalItems, currentPage) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const container = document.querySelector('.pagination');
  if (!container) return;
  container.innerHTML = '';

  const makeLink = (label, page, active=false) => {
    const a = document.createElement('a');
    a.href = '#';
    if (active) a.classList.add('active');
    a.textContent = label;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      renderPage(page);
    });
    return a;
  };

  if (currentPage > 1) container.appendChild(makeLink('Prev', currentPage - 1));
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let p = start; p <= end; p++) {
    container.appendChild(makeLink(String(p), p, p === currentPage));
  }
  if (currentPage < totalPages) container.appendChild(makeLink('Next', currentPage + 1));
};

const renderPage = (page = 1) => {
  const resultsContainer = document.getElementById('search-results');
  const countEl = document.getElementById('search-count');
  const timeEl = document.getElementById('search-time');
  const queryEl = document.getElementById('search-query');
  if (!resultsContainer) return;

  const filtered = applyFilters(rawResults);
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  resultsContainer.innerHTML = total === 0 ? '<p>No results found.</p>' : pageItems.map(renderResult).join('');
  if (countEl) countEl.textContent = total;
  renderPagination(total, page);
};

const resetFilters = () => {
  document.querySelectorAll('#category-filters input[type="checkbox"]').forEach((i, idx) => i.checked = idx === 0 ? true : false);
  document.getElementById('date-from').value = '';
  document.getElementById('date-to').value = '';
  document.getElementById('sort-select').value = 'relevance';
  document.querySelectorAll('#type-filters input[type="checkbox"]').forEach(i => i.checked = i.value === 'article');
};

const bindFilterButtons = () => {
  document.querySelector('.apply-filters')?.addEventListener('click', (e) => { e.preventDefault(); renderPage(1); });
  document.querySelector('.reset-filters')?.addEventListener('click', (e) => { e.preventDefault(); resetFilters(); renderPage(1); });
};

const init = async () => {
  await initComponents();
  const q = getQueryParam('q') || document.getElementById('search-query')?.textContent || '';
  const query = (q || '').replace(/"/g, '').trim();
  const start = performance.now();
  rawResults = await searchNews(query);
  const end = performance.now();

  const queryEl = document.getElementById('search-query');
  const timeEl = document.getElementById('search-time');
  if (queryEl) queryEl.textContent = query ? `"${query}"` : '""';
  if (timeEl) timeEl.textContent = ((end - start) / 1000).toFixed(2);

  bindFilterButtons();
  renderPage(1);
};

document.addEventListener('DOMContentLoaded', init);
