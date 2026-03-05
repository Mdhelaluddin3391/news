// ==================== DYNAMIC DATA POPULATION ====================
// Mock data for demonstration
const mockData = {
    featured: {
        id: 'featured-1',
        category: 'World',
        title: 'Global Leaders Meet for Emergency Climate Summit',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1500&q=80',
        time: '2 hours ago',
        author: 'Robert Chen',
        comments: 342
    },
    trending: [
        { id: 't1', title: 'Major Political Scandal Rocks Capital', category: 'Politics' },
        { id: 't2', title: 'Revolutionary Battery Technology Announced', category: 'Technology' },
        { id: 't3', title: 'Film Festival Announces Winners', category: 'Entertainment' },
        { id: 't4', title: 'New Study on Mediterranean Diet', category: 'Health' },
        { id: 't5', title: 'Central Bank Interest Rate Decision', category: 'Business' }
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
    ],
    breaking: [
        'Global summit agreement reached',
        'Stock market hits record high',
        'AI breakthrough announced'
    ]
};

// Populate Featured News (big photo with title overlay)
const featuredContainer = document.getElementById('featured-news-container');
if (featuredContainer) {
    featuredContainer.innerHTML = `
                <img src="${mockData.featured.image}" alt="${mockData.featured.title}" class="featured-image">
                <div class="featured-overlay">
                    <span class="featured-category">${mockData.featured.category}</span>
                    <h2 class="featured-title">${mockData.featured.title}</h2>
                    <div class="featured-meta">
                        <span><i class="far fa-clock"></i> ${mockData.featured.time}</span>
                        <span><i class="far fa-user"></i> By ${mockData.featured.author}</span>
                        <span><i class="far fa-comment"></i> ${mockData.featured.comments} comments</span>
                    </div>
                </div>
            `;
    // Click to open article (demo)
    featuredContainer.addEventListener('click', () => {
        window.location.href = `article.html?id=${mockData.featured.id}`;
    });
}

// Populate Trending
const trendingContainer = document.getElementById('trending-container');
if (trendingContainer) {
    let html = '';
    mockData.trending.forEach((item, index) => {
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
    trendingContainer.innerHTML = html;
    // Add click handlers
    trendingContainer.querySelectorAll('.trending-news-item').forEach(item => {
        item.addEventListener('click', () => {
            window.location.href = `article.html?id=${item.dataset.id}`;
        });
    });
}

// Populate Categories
const categoriesContainer = document.getElementById('categories-container');
if (categoriesContainer) {
    let html = '';
    mockData.categories.forEach(cat => {
        html += `
                    <li><a href="index.html?category=${cat.slug}">${cat.name} <span class="category-count">${cat.count}</span></a></li>
                `;
    });
    categoriesContainer.innerHTML = html;
}

// Populate Breaking Ticker
const tickerSpan = document.getElementById('breaking-ticker-content');
if (tickerSpan) {
    tickerSpan.textContent = '• ' + mockData.breaking.join(' • ');
}

// ==================== EXISTING FUNCTIONALITY ====================
// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});
closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

// Update date/time in top bar
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerText =
        now.toDateString() + " | " + now.toLocaleTimeString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Newsletter form submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}\nYou'll receive our newsletter shortly.`);
        newsletterForm.reset();
    });
}