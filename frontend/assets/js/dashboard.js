import { initComponents } from './app.js';
import { fetchSavedArticles, removeSavedArticleForUser, fetchUserProfile } from './api-adapter.js';

const renderSaved = (articles) => {
  if (!articles || articles.length === 0) return '<p>No saved articles yet.</p>';
  return articles
    .map(
      (a) => `
        <div class="saved-item" data-id="${a.id}" style="display:flex;gap:12px;margin-bottom:12px">
          <img src="${a.image}" alt="${a.title}" style="width:120px;height:72px;object-fit:cover;border-radius:6px">
          <div>
            <a href="/news-detail.html?id=${a.id}"><h4>${a.title}</h4></a>
            <div style="color:var(--muted);font-size:14px">${a.author} • ${new Date(a.date).toLocaleDateString()}</div>
            <button class="btn unsave-btn" data-id="${a.id}" style="margin-top:8px">Remove</button>
          </div>
        </div>
      `
    )
    .join('');
};

const init = async () => {
  await initComponents();
  const savedContainer = document.getElementById('saved-list');
  const profileName = document.getElementById('profile-name');
  if (profileName) {
    const profile = await fetchUserProfile();
    profileName.textContent = profile.name;
  }

  if (!savedContainer) return;
  const articles = await fetchSavedArticles();
  savedContainer.innerHTML = renderSaved(articles);

  savedContainer.addEventListener('click', async (e) => {
    const btn = e.target.closest('.unsave-btn');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    await removeSavedArticleForUser(id);
    const updated = await fetchSavedArticles();
    savedContainer.innerHTML = renderSaved(updated);
  });
};

document.addEventListener('DOMContentLoaded', init);
