// ==================== HOMEPAGE.JS ====================
// Depends on auth.js, saved.js, script.js (for helpers)

const USE_MOCK = true; // Set false for real API
const API_BASE_URL = 'https://your-backend.com/api'; // Base URL for endpoints

// Mock data extended with featured, trending, breaking flags
const mockArticles = {
    featured: [
        {
            id: 'gen-1',
            category: 'world',
            title: 'Global Climate Summit Reaches Historic Agreement',
            description: 'Nations commit to new carbon reduction targets in landmark deal.',
            urlToImage: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            publishedAt: new Date().toISOString(),
            author: 'Robert Chen',
            commentsCount: 342,
            source: { name: 'BBC News' }
        }
    ],
    grid: [
        {
            id: 'gen-2',
            category: 'business',
            title: 'Stock Markets Surge to Record High Amid Economic Recovery',
            description: 'Global markets show strong performance as investors react positively to new economic data and corporate earnings reports.',
            urlToImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            publishedAt: new Date(Date.now() - 4 * 3600000).toISOString(),
            views: 1200,
            source: { name: 'Bloomberg' }
        },
        {
            id: 'tech-1',
            category: 'technology',
            title: 'New AI Model Can Generate Realistic Videos from Text Descriptions',
            description: 'Researchers unveil breakthrough in generative AI that could revolutionize content creation and raise new ethical questions.',
            urlToImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            publishedAt: new Date(Date.now() - 6 * 3600000).toISOString(),
            views: 2100,
            source: { name: 'TechCrunch' }
        },
        {
            id: 'sport-1',
            category: 'sports',
            title: 'National Team Secures Spot in World Championship Finals',
            description: 'Dramatic semifinal match ends in victory for the home team, securing their place in the championship game this weekend.',
            urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            publishedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
            views: 3400,
            source: { name: 'ESPN' }
        },
        {
            id: 'health-1',
            category: 'health',
            title: 'Breakthrough in Cancer Treatment Shows 90% Success Rate in Trials',
            description: 'New immunotherapy approach demonstrates remarkable effectiveness against previously untreatable forms of cancer.',
            urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
            publishedAt: new Date(Date.now() - 10 * 3600000).toISOString(),
            views: 4500,
            source: { name: 'Medical News Today' }
        }
    ],
    trending: [
        { id: 'pol-1', title: 'Major Political Scandal Rocks Capital', category: 'politics' },
        { id: 'tech-2', title: 'Revolutionary Battery Technology Announced', category: 'technology' },
        { id: 'ent-1', title: 'Film Festival Announces This Year\'s Winners', category: 'entertainment' },
        { id: 'health-2', title: 'New Study Reveals Benefits of Mediterranean Diet', category: 'health' },
        { id: 'bus-2', title: 'Central Bank Announces Interest Rate Decision', category: 'business' }
    ],
    breaking: [
        'Global Climate Summit reaches historic agreement on carbon emissions',
        'Tech giant unveils revolutionary AI assistant',
        'Major earthquake hits coastal region, rescue operations underway',
        'Stock markets reach all-time high amid economic optimism'
    ],
    categories: [
        { name: 'World', count: 42, slug: 'world' },
        { name: 'Politics', count: 28, slug: 'politics' },
        { name: 'Business', count: 35, slug: 'business' },
        { name: 'Technology', count: 47, slug: 'technology' },
        { name: 'Health', count: 23, slug: 'health' },
        { name: 'Sports', count: 39, slug: 'sports' },
        { name: 'Entertainment', count: 31, slug: 'entertainment' },
        { name: 'Science', count: 19, slug: 'science' }
    ]
};

// ==================== Render Functions ====================
function renderFeatured(article) {
    const container = document.getElementById('featured-news-container');
    if (!container || !article) return;

    const timeAgo = formatTimeAgo(article.publishedAt);
    container.innerHTML = `
        <img src="${article.urlToImage}" alt="${article.title}" class="featured-image">
        <div class="featured-overlay">
            <span class="featured-category">${article.category.toUpperCase()}</span>
            <h2 class="featured-title">${article.title}</h2>
            <div class="featured-meta">
                <span><i class="far fa-clock"></i> ${timeAgo}</span>
                <span><i class="far fa-user"></i> By ${article.author || 'Staff'}</span>
                <span><i class="far fa-comment"></i> ${article.commentsCount || 0} comments</span>
            </div>
        </div>
    `;
    // Add click event to open article
    container.addEventListener('click', () => {
        window.location.href = `article.html?id=${article.id}`;
    });
}

function renderGrid(articles) {
    const container = document.getElementById('news-grid-container');
    if (!container) return;

    let html = '';
    articles.forEach(article => {
        const timeAgo = formatTimeAgo(article.publishedAt);
        html += `
            <div class="news-card" data-id="${article.id}">
                <img src="${article.urlToImage}" alt="${article.title}">
                <div class="news-card-content">
                    <span class="news-category">${article.category.toUpperCase()}</span>
                    <h3 class="news-title">${article.title}</h3>
                    <p class="news-excerpt">${article.description}</p>
                    <div class="news-meta">
                        <span><i class="far fa-clock"></i> ${timeAgo}</span>
                        <span><i class="far fa-eye"></i> ${article.views || 0} views</span>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            window.location.href = `article.html?id=${id}`;
        });
    });
}

function renderTrending(trending) {
    const container = document.getElementById('trending-container');
    if (!container) return;

    let html = '';
    trending.forEach((item, index) => {
        const number = (index + 1).toString().padStart(2, '0');
        html += `
            <div class="trending-news-item" data-id="${item.id}">
                <div class="trending-number">${number}</div>
                <div class="trending-content">
                    <h4>${item.title}</h4>
                    <div class="trending-category">${item.category.toUpperCase()}</div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    container.querySelectorAll('.trending-news-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;
            window.location.href = `article.html?id=${id}`;
        });
    });
}

function renderCategories(categories) {
    const container = document.getElementById('categories-container');
    if (!container) return;

    let html = '';
    categories.forEach(cat => {
        html += `
            <li><a href="index.html?category=${cat.slug}">${cat.name} <span class="category-count">${cat.count}</span></a></li>
        `;
    });
    container.innerHTML = html;
}

function renderBreakingTicker(messages) {
    const container = document.getElementById('breaking-ticker-content');
    if (!container) return;
    // Join messages with bullet
    container.textContent = '• ' + messages.join(' • ');
}

// Helper: time ago
function formatTimeAgo(isoString) {
    const now = new Date();
    const past = new Date(isoString);
    const diffMs = now - past;
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

// ==================== Fetch Data (mock or real) ====================
async function fetchHomepageData() {
    if (USE_MOCK) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockArticles;
    } else {
        // Real API calls – you'd create endpoints for each section
        const [featured, grid, trending, breaking, categories] = await Promise.all([
            fetch(`${API_BASE_URL}/featured`).then(r => r.json()),
            fetch(`${API_BASE_URL}/latest`).then(r => r.json()),
            fetch(`${API_BASE_URL}/trending`).then(r => r.json()),
            fetch(`${API_BASE_URL}/breaking`).then(r => r.json()),
            fetch(`${API_BASE_URL}/categories`).then(r => r.json())
        ]);
        return { featured, grid, trending, breaking, categories };
    }
}

// ==================== Initialize Homepage ====================
async function initHomepage() {
    const data = await fetchHomepageData();
    renderFeatured(data.featured[0]); // assuming featured is an array with one item
    renderGrid(data.grid);
    renderTrending(data.trending);
    renderCategories(data.categories);
    renderBreakingTicker(data.breaking);
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Update date/time (already in your HTML)
    // Initialize auth UI (if not already done in auth.js)
    if (typeof updateAuthUI === 'function') updateAuthUI();

    // Load homepage sections
    initHomepage();

    // Search form handling
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Mock subscription – replace with real API call
            alert(`Thank you for subscribing with: ${email}\nYou'll receive our newsletter shortly.`);
            newsletterForm.reset();
        });
    }

    // Mobile menu toggle (already in your HTML, but we'll keep it)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});




