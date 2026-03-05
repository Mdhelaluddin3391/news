// ==================== CONFIGURATION ====================
// Set USE_MOCK to false and provide your API details to use a real backend
const USE_MOCK = true;                     // Change to false to use real API
const API_BASE_URL = 'https://your-backend.com/api/news'; // Replace with your endpoint
const API_KEY = 'YOUR_API_KEY';             // Only if required
const DEFAULT_CATEGORY = 'general';
// Add at top with other config
const ARTICLES_PER_PAGE = 6; // or whatever you prefer

// ==================== MOCK DATA (Fallback) ====================
const mockArticles = {
    general: [
        {
            id: 'gen-1',
            title: 'Global Climate Summit Reaches Historic Agreement',
            description: 'Nations commit to new carbon reduction targets in landmark deal.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/1015/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'BBC News' }
        },
        {
            id: 'gen-2',
            title: 'Breakthrough in Renewable Energy Storage',
            description: 'Scientists develop a new battery that could revolutionize solar power.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/16/300/200',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: 'TechCrunch' }
        },
        {
            id: 'gen-3',
            title: 'New AI Model Can Predict Weather with 99% Accuracy',
            description: 'DeepMind’s latest AI outperforms traditional forecasting methods.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/1043/300/200',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: 'Wired' }
        }
    ],
    technology: [
        {
            id: 'tech-1',
            title: 'Apple Unveils Augmented Reality Glasses',
            description: 'The new device blends digital content seamlessly with the real world.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/0/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'The Verge' }
        },
        {
            id: 'tech-2',
            title: 'Quantum Computing Milestone Achieved',
            description: 'IBM’s new processor solves problem in seconds that would take supercomputers years.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/20/300/200',
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            source: { name: 'MIT Tech Review' }
        }
    ],
    sports: [
        {
            id: 'sport-1',
            title: 'Champions League Final: Underdog Victory',
            description: 'A stunning match ends with a last-minute goal securing the trophy.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/28/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'ESPN' }
        },
        {
            id: 'sport-2',
            title: 'Olympics 2025: New Sports Announced',
            description: 'Skateboarding and climbing officially included in the next games.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/82/300/200',
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            source: { name: 'Sports Illustrated' }
        }
    ],
    business: [
        {
            id: 'bus-1',
            title: 'Stock Markets Hit All-Time High',
            description: 'Tech shares lead the rally as earnings exceed expectations.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/21/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'Bloomberg' }
        },
        {
            id: 'bus-2',
            title: 'Fed Announces Interest Rate Decision',
            description: 'Rates remain steady amid mixed economic signals.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/24/300/200',
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            source: { name: 'WSJ' }
        }
    ],
    entertainment: [
        {
            id: 'ent-1',
            title: 'Oscars 2025: Full Winners List',
            description: 'Surprises and historic wins at the 97th Academy Awards.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/96/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'Variety' }
        },
        {
            id: 'ent-2',
            title: 'Beyoncé Announces World Tour',
            description: 'Tickets go on sale next week for the highly anticipated tour.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/15/300/200',
            publishedAt: new Date(Date.now() - 43200000).toISOString(),
            source: { name: 'Billboard' }
        }
    ],
    health: [
        {
            id: 'health-1',
            title: 'New Drug Shows Promise in Alzheimer’s Trial',
            description: 'Phase 3 results indicate significant slowing of cognitive decline.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/42/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'Medical News Today' }
        },
        {
            id: 'health-2',
            title: 'WHO Declares End to Global Health Emergency',
            description: 'COVID-19 no longer constitutes a public health emergency of international concern.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/72/300/200',
            publishedAt: new Date(Date.now() - 604800000).toISOString(),
            source: { name: 'Reuters' }
        }
    ],
    science: [
        {
            id: 'sci-1',
            title: 'Perseverance Rover Finds Organic Molecules on Mars',
            description: 'New evidence supports possibility of ancient microbial life.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/104/300/200',
            publishedAt: new Date().toISOString(),
            source: { name: 'NASA' }
        },
        {
            id: 'sci-2',
            title: 'First-Ever Image of a Black Hole’s Magnetic Field',
            description: 'Event Horizon Telescope reveals new details from M87.',
            url: '#',
            urlToImage: 'https://picsum.photos/id/103/300/200',
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            source: { name: 'Space.com' }
        }
    ]
};

// ==================== DOM Elements ====================
const categoryHeading = document.getElementById('category-heading');
const articlesContainer = document.getElementById('articles-container');
const loader = document.getElementById('loader');
const errorMessageDiv = document.getElementById('error-message');
const categoryButtons = document.querySelectorAll('.category-btn');

// ==================== Helper Functions ====================
function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    setTimeout(() => {
        errorMessageDiv.style.display = 'none';
    }, 5000);
}

function clearError() {
    errorMessageDiv.style.display = 'none';
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// ==================== Rendering ====================
function renderArticles(articles) {
    if (!articles || articles.length === 0) {
        articlesContainer.innerHTML = '<p style="text-align: center; color: var(--gray);">No articles found.</p>';
        return;
    }

    const user = getCurrentUser(); // from auth.js
    const html = articles.map(article => {
        const imageUrl = article.urlToImage || 'https://picsum.photos/300/200?random=1';
        const title = article.title || 'Untitled';
        const description = article.description || 'No description available.';
        const source = article.source?.name || 'Unknown source';
        const date = article.publishedAt ? formatDate(article.publishedAt) : 'Unknown date';
        const articleId = article.id || '';
        const isSaved = user ? isArticleSaved(articleId) : false;
        const saveButton = user ?
            `<button class="save-btn ${isSaved ? 'saved' : ''}" data-id="${articleId}">${isSaved ? 'Saved' : 'Save'}</button>`
            : '';

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
                        ${saveButton}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    articlesContainer.innerHTML = html;

    // Attach event listeners to save buttons if user logged in
    if (user) {
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const articleId = btn.dataset.id;
                const article = articles.find(a => a.id === articleId);
                if (!article) return;

                if (btn.classList.contains('saved')) {
                    unsaveArticle(articleId);
                    btn.classList.remove('saved');
                    btn.textContent = 'Save';
                } else {
                    saveArticle(article);
                    btn.classList.add('saved');
                    btn.textContent = 'Saved';
                }
            });
        });
    }
}

// ==================== Fetch News ====================
async function fetchNews(category = DEFAULT_CATEGORY, page = 1) {
    showLoader();
    clearError();
    articlesContainer.innerHTML = '';

    try {
        let articles = [];
        let totalResults = 0;

        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 800));
            // Get all articles for the category
            const allCategoryArticles = mockArticles[category] || mockArticles.general;
            totalResults = allCategoryArticles.length;
            // Paginate: slice based on page
            const start = (page - 1) * ARTICLES_PER_PAGE;
            const end = start + ARTICLES_PER_PAGE;
            articles = allCategoryArticles.slice(start, end);
        } else {
            const url = new URL(API_BASE_URL);
            url.searchParams.append('category', category);
            url.searchParams.append('page', page);
            url.searchParams.append('pageSize', ARTICLES_PER_PAGE);
            if (API_KEY) url.searchParams.append('apiKey', API_KEY);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            const data = await response.json();
            articles = data.articles || data;
            totalResults = data.totalResults || articles.length; // if API provides total
        }

        renderArticles(articles);
        updatePagination(page, totalResults, category);
        categoryHeading.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' News';
    } catch (error) {
        console.error('Fetch failed:', error);
        if (!USE_MOCK) {
            // fallback logic...
        } else {
            showError('Failed to load news.');
        }
    } finally {
        hideLoader();
    }
}



function updatePagination(currentPage, totalItems, category) {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    const totalPages = Math.ceil(totalItems / ARTICLES_PER_PAGE);

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    // Remove old listeners and add new ones
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    nextBtn.replaceWith(nextBtn.cloneNode(true));

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            fetchNews(category, currentPage - 1);
            // Update URL without reload
            const url = new URL(window.location);
            url.searchParams.set('page', currentPage - 1);
            window.history.pushState({}, '', url);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < totalPages) {
            fetchNews(category, currentPage + 1);
            const url = new URL(window.location);
            url.searchParams.set('page', currentPage + 1);
            window.history.pushState({}, '', url);
        }
    });
}





// ==================== Category Switching ====================
function setActiveCategory(category) {
    categoryButtons.forEach(btn => {
        const btnCategory = btn.getAttribute('data-category');
        if (btnCategory === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        setActiveCategory(category);
        fetchNews(category, 1);
        // Update URL: remove page param, set category
        const url = new URL(window.location);
        url.searchParams.set('category', category);
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || DEFAULT_CATEGORY;
    const page = parseInt(urlParams.get('page')) || 1;
    setActiveCategory(category);
    fetchNews(category, page);
});


// Mobile menu and date/time (same as above)
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");
menuBtn.addEventListener("click", () => mobileMenu.classList.add("active"));
closeBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));

function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerText = now.toDateString() + " | " + now.toLocaleTimeString();
}
updateDateTime();
setInterval(updateDateTime, 1000);