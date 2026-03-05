// js/author.js
const mockAuthorData = {
    name: "Robert Chen",
    role: "Senior Tech & World Reporter",
    bio: "Robert has over 15 years of experience covering global tech trends and international summits. He is passionate about climate change and AI innovations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    social: {
        twitter: "#",
        linkedin: "#"
    }
};

const mockAuthorArticles = [
    {
        id: 'gen-1',
        title: 'Global Climate Summit Reaches Historic Agreement',
        description: 'Nations commit to new carbon reduction targets in landmark deal.',
        urlToImage: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=300&q=80',
        publishedAt: new Date().toISOString()
    },
    {
        id: 'tech-1',
        title: 'New AI Model Can Generate Realistic Videos from Text',
        description: 'Researchers unveil breakthrough in generative AI.',
        urlToImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=300&q=80',
        publishedAt: new Date(Date.now() - 86400000).toISOString()
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Populate Author Info
    const authorCard = document.getElementById('author-details');
    authorCard.innerHTML = `
        <img src="${mockAuthorData.avatar}" alt="${mockAuthorData.name}" class="author-avatar">
        <div class="author-info">
            <h1>${mockAuthorData.name}</h1>
            <div class="author-role">${mockAuthorData.role}</div>
            <p class="author-bio">${mockAuthorData.bio}</p>
            <div class="author-social">
                <a href="${mockAuthorData.social.twitter}"><i class="fab fa-twitter"></i></a>
                <a href="${mockAuthorData.social.linkedin}"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    `;

    // Populate Author Articles
    const articlesContainer = document.getElementById('author-articles');
    let articlesHtml = '';
    
    mockAuthorArticles.forEach(article => {
        const date = new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        articlesHtml += `
            <div class="article-card">
                <img src="${article.urlToImage}" alt="${article.title}" class="article-image">
                <div class="article-content">
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-description">${article.description}</p>
                    <div class="article-meta">
                        <span class="article-date">${date}</span>
                        <a href="article.html?id=${article.id}" class="read-more">Read more →</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    articlesContainer.innerHTML = articlesHtml;
});