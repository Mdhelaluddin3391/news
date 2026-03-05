// ==================== SAVED ARTICLES PAGE ====================

const articlesContainer = document.getElementById('articles-container');
const loader = document.getElementById('loader');
const errorDiv = document.getElementById('error-message');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function renderArticles(articles) {
    if (!articles || articles.length === 0) {
        articlesContainer.innerHTML = '<p style="text-align: center; color: var(--gray);">You have no saved articles.</p>';
        return;
    }

    const user = getCurrentUser();
    const html = articles.map(article => {
        const imageUrl = article.urlToImage || 'https://picsum.photos/300/200?random=1';
        const title = article.title || 'Untitled';
        const description = article.description || 'No description available.';
        const source = article.source?.name || 'Unknown source';
        const date = article.publishedAt ? formatDate(article.publishedAt) : 'Unknown date';
        const articleId = article.id || '';
        const isSaved = true; // by definition

        return `
            <div class="article-card">
                <img src="${imageUrl}" alt="${title}" class="article-image" loading="lazy">
                <div class="article-content">
                    <h3 class="article-title">${title}</h3>
                    <p class="article-description">${description}</p>
                    <div class="article-meta">
                        <span class="article-source">${source}</span>
                        <span class="article-date">${date}</span>
                        <a href="article.html?id=${articleId}" class="read-more">Read more →</a>
                        <button class="save-btn saved" data-id="${articleId}">Saved</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    articlesContainer.innerHTML = html;

    // Attach unsave functionality
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const articleId = btn.dataset.id;
            unsaveArticle(articleId);
            // Remove the card from UI
            btn.closest('.article-card').remove();
            // If no articles left, show empty message
            if (articlesContainer.children.length === 0) {
                articlesContainer.innerHTML = '<p style="text-align: center; color: var(--gray);">You have no saved articles.</p>';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (!user) {
        // Redirect to login with return URL
        window.location.href = 'login.html?redirect=saved.html';
        return;
    }

    showLoader();
    // Simulate loading
    setTimeout(() => {
        const saved = getSavedArticles();
        renderArticles(saved);
        hideLoader();
    }, 500);
});