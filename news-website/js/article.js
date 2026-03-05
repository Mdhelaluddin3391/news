// ==================== CONFIGURATION ====================
// Must match the settings in script.js
const USE_MOCK = true;                     // Change to false to use real API
const API_BASE_URL = 'https://your-backend.com/api/article'; // Endpoint for single article
const API_KEY = 'YOUR_API_KEY';

// ==================== MOCK DATA (enriched with IDs and categories) ====================
const mockArticlesById = {
    // general
    'gen-1': {
        id: 'gen-1',
        category: 'general',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'Nations commit to new carbon reduction targets in landmark deal.',
        content: 'After two weeks of intense negotiations, delegates from nearly 200 countries have agreed to a landmark climate accord... (full article content would go here)',
        url: '#',
        urlToImage: 'https://picsum.photos/id/1015/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'BBC News' }
    },
    'gen-2': {
        id: 'gen-2',
        category: 'general',
        title: 'Breakthrough in Renewable Energy Storage',
        description: 'Scientists develop a new battery that could revolutionize solar power.',
        content: 'Researchers at Stanford University have unveiled a new type of battery that stores solar energy at half the cost of current lithium-ion technology...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/16/1200/600',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: 'TechCrunch' }
    },
    // technology
    'tech-1': {
        id: 'tech-1',
        category: 'technology',
        title: 'Apple Unveils Augmented Reality Glasses',
        description: 'The new device blends digital content seamlessly with the real world.',
        content: 'Apple today announced its long-rumored augmented reality glasses, called "Apple Vision"...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/0/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'The Verge' }
    },
    // sports
    'sport-1': {
        id: 'sport-1',
        category: 'sports',
        title: 'Champions League Final: Underdog Victory',
        description: 'A stunning match ends with a last-minute goal securing the trophy.',
        content: 'In a final that will be remembered for decades, the underdog team snatched victory from the jaws of defeat...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/28/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'ESPN' }
    },
    // business
    'bus-1': {
        id: 'bus-1',
        category: 'business',
        title: 'Stock Markets Hit All-Time High',
        description: 'Tech shares lead the rally as earnings exceed expectations.',
        content: 'Wall Street surged to record highs today as technology stocks continued their upward momentum...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/21/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'Bloomberg' }
    },
    // entertainment
    'ent-1': {
        id: 'ent-1',
        category: 'entertainment',
        title: 'Oscars 2025: Full Winners List',
        description: 'Surprises and historic wins at the 97th Academy Awards.',
        content: 'The 2025 Oscars delivered unforgettable moments...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/96/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'Variety' }
    },
    // health
    'health-1': {
        id: 'health-1',
        category: 'health',
        title: 'New Drug Shows Promise in Alzheimer’s Trial',
        description: 'Phase 3 results indicate significant slowing of cognitive decline.',
        content: 'A new drug developed by Biogen has shown remarkable results in slowing the progression of Alzheimer’s disease...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/42/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'Medical News Today' }
    },
    // science
    'sci-1': {
        id: 'sci-1',
        category: 'science',
        title: 'Perseverance Rover Finds Organic Molecules on Mars',
        description: 'New evidence supports possibility of ancient microbial life.',
        content: 'NASA’s Perseverance rover has detected organic molecules in a rock sample collected from Jezero Crater...',
        url: '#',
        urlToImage: 'https://picsum.photos/id/104/1200/600',
        publishedAt: new Date().toISOString(),
        source: { name: 'NASA' }
    }
};

// ==================== DOM Elements ====================
const articleContainer = document.getElementById('article-detail');
const loader = document.getElementById('loader');
const errorDiv = document.getElementById('error-message');

// ==================== Helper Functions ====================
function showLoader() {
    loader.style.display = 'block';
    if (articleContainer) articleContainer.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
    if (articleContainer) articleContainer.style.display = 'block';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function clearError() {
    errorDiv.style.display = 'none';
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

// ==================== Render Article ====================
function renderArticle(article) {
    if (!article) {
        articleContainer.innerHTML = '<p style="text-align: center;">Article not found.</p>';
        return;
    }

    const user = getCurrentUser();
    const isSaved = user ? isArticleSaved(article.id) : false;
    const imageUrl = article.urlToImage || 'https://picsum.photos/1200/600?random=1';
    const title = article.title || 'Untitled';
    const source = article.source?.name || 'Unknown source';
    const date = article.publishedAt ? formatDate(article.publishedAt) : 'Unknown date';
    const description = article.description || '';
    const content = article.content || article.description || 'Full content is not available.';
    const category = article.category || 'general'; // fallback category

    const saveButton = user ? 
        `<button class="save-btn detail-save-btn ${isSaved ? 'saved' : ''}" data-id="${article.id}">${isSaved ? 'Saved' : 'Save for Later'}</button>` 
        : '';

    // Social sharing buttons (using current page URL)
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(title);
    const shareHTML = `
        <div class="social-share">
            <h3>Share this article</h3>
            <div class="share-buttons">
                <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="share-btn facebook">Facebook</a>
                <a href="https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}" target="_blank" class="share-btn twitter">Twitter</a>
                <a href="https://wa.me/?text=${shareTitle}%20${shareUrl}" target="_blank" class="share-btn whatsapp">WhatsApp</a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}" target="_blank" class="share-btn linkedin">LinkedIn</a>
            </div>
        </div>
    `;

    // Related articles placeholder
    const relatedHTML = `
        <section class="related-articles">
            <h3>Related Articles</h3>
            <div id="related-container"></div>
        </section>
    `;

    // Comments placeholder
    const commentsHTML = `
        <section class="comments-section">
            <h3>Comments</h3>
            <div id="comments-list"></div>
            <div id="comment-form-container"></div>
        </section>
    `;

    const html = `
        <img src="${imageUrl}" alt="${title}" class="detail-image">
        <div class="detail-content">
            <h1 class="detail-title">${title}</h1>
            <div class="detail-meta">
                <span class="detail-source">${source}</span>
                <span class="detail-date">${date}</span>
            </div>
            ${description ? `<p class="detail-description">${description}</p>` : ''}
            <div class="detail-body">
                ${content.split('\n').map(para => `<p>${para}</p>`).join('')}
            </div>
            ${shareHTML}
            ${relatedHTML}
            ${commentsHTML}
            <div class="detail-actions">
                <a href="index.html" class="back-link">← Back to Home</a>
                ${saveButton}
            </div>
        </div>
    `;

    articleContainer.innerHTML = html;

    // Load related articles
    if (typeof renderRelated === 'function') {
        renderRelated('related-container', category, article.id);
    } else {
        console.warn('renderRelated function not available. Make sure related.js is loaded.');
    }

    // Load comments
    if (typeof renderComments === 'function') {
        renderComments(article.id, 'comments-list');
    } else {
        console.warn('renderComments function not available. Make sure comments.js is loaded.');
    }

    // Attach save button listener if user is logged in
    if (user) {
        const saveBtn = document.querySelector('.detail-save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const articleId = saveBtn.dataset.id;
                if (saveBtn.classList.contains('saved')) {
                    unsaveArticle(articleId);
                    saveBtn.classList.remove('saved');
                    saveBtn.textContent = 'Save for Later';
                } else {
                    saveArticle(article);
                    saveBtn.classList.add('saved');
                    saveBtn.textContent = 'Saved';
                }
            });
        }
    }
}

// ==================== Fetch Article ====================
async function fetchArticle(articleId) {
    showLoader();
    clearError();

    try {
        let article = null;

        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500)); // simulate network
            article = mockArticlesById[articleId];
            if (!article) {
                throw new Error('Article not found in mock data');
            }
        } else {
            const url = new URL(API_BASE_URL);
            url.searchParams.append('id', articleId);
            if (API_KEY) url.searchParams.append('apiKey', API_KEY);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            article = await response.json();
            // assume response is the article object
        }

        renderArticle(article);
    } catch (error) {
        console.error('Failed to fetch article:', error);
        showError('Could not load the article. Please try again later.');
        articleContainer.innerHTML = ''; // clear any partial content
    } finally {
        hideLoader();
    }
}

// ==================== Get ID from URL ====================
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// ==================== Initial Load ====================
document.addEventListener('DOMContentLoaded', () => {
    const articleId = getArticleIdFromUrl();
    if (!articleId) {
        showError('No article ID specified.');
        articleContainer.innerHTML = '<p style="text-align: center;">Please select an article from the homepage.</p>';
        return;
    }
    fetchArticle(articleId);
});