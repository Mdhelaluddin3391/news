// Page-specific script for index.html
import { initComponents } from './app.js';
import { fetchBreakingNews, fetchTrendingNews } from './api-adapter.js';

const renderBreaking = (items) => {
  const placeholder = document.getElementById('breaking-placeholder');
  if (!placeholder) return;
  if (!items || items.length === 0) {
    placeholder.textContent = 'No breaking news at the moment.';
    return;
  }
  const text = items.map((i) => `${i.title}`).join(' • ');
  placeholder.textContent = `• ${text}`;
};

const renderTrending = (items) => {
  const container = document.getElementById('trending-placeholder');
  if (!container) return;
  if (!items || items.length === 0) {
    container.innerHTML = '<p>No trending articles.</p>';
    return;
  }
  container.innerHTML = items
    .map((item, idx) => {
      const num = String(idx + 1).padStart(2, '0');
      return `
        <div class="trending-news-item">
          <div class="trending-number">${num}</div>
          <div class="trending-content">
            <a href="/news-detail.html?id=${item.id}"><h4>${item.title}</h4></a>
            <div class="trending-category">${item.category_slug.toUpperCase()}</div>
          </div>
        </div>
      `;
    })
    .join('');
};

const init = async () => {
  await initComponents();
  try {
    const [breaking, trending] = await Promise.all([fetchBreakingNews(), fetchTrendingNews()]);
    renderBreaking(breaking);
    renderTrending(trending);
  } catch (err) {
    console.error('Failed to load index data', err);
  }
};

document.addEventListener('DOMContentLoaded', init);
