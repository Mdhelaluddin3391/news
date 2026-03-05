// ==================== RELATED ARTICLES MODULE ====================

const RELATED_API_URL = 'https://your-backend.com/api/related'; // Replace

// Mock related articles data (by category)
const mockRelated = {
    general: [
        { id: 'gen-2', title: 'Breakthrough in Renewable Energy', urlToImage: 'https://picsum.photos/id/16/200/120', url: '#' },
        { id: 'gen-3', title: 'New AI Model Predicts Weather', urlToImage: 'https://picsum.photos/id/1043/200/120', url: '#' }
    ],
    technology: [
        { id: 'tech-2', title: 'Quantum Computing Milestone', urlToImage: 'https://picsum.photos/id/20/200/120', url: '#' },
        { id: 'tech-1', title: 'Apple Unveils AR Glasses', urlToImage: 'https://picsum.photos/id/0/200/120', url: '#' }
    ],
    sports: [
        { id: 'sport-2', title: 'Olympics 2025: New Sports', urlToImage: 'https://picsum.photos/id/82/200/120', url: '#' },
        { id: 'sport-1', title: 'Champions League Final', urlToImage: 'https://picsum.photos/id/28/200/120', url: '#' }
    ]
};

// Fetch related articles based on current article's category
async function fetchRelatedArticles(category, currentArticleId) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            let related = mockRelated[category] || mockRelated.general;
            // Filter out current article if accidentally included
            related = related.filter(a => a.id !== currentArticleId);
            resolve(related.slice(0, 3)); // limit to 3
        }, 400);
    });
}

// Render related articles in container
async function renderRelated(containerId, category, currentArticleId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const related = await fetchRelatedArticles(category, currentArticleId);
    if (related.length === 0) {
        container.innerHTML = '<p>No related articles found.</p>';
        return;
    }

    let html = '';
    related.forEach(a => {
        html += `
            <div class="related-card">
                <a href="article.html?id=${a.id}">
                    <img src="${a.urlToImage}" alt="${a.title}" loading="lazy">
                    <div class="related-content">
                        <h4>${a.title}</h4>
                    </div>
                </a>
            </div>
        `;
    });
    container.innerHTML = html;
}