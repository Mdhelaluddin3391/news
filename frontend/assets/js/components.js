/**
 * Components Module
 * Saare UI components render karega
 */

const Components = {
    /**
     * Featured news section render kare
     */
    renderFeaturedNews(news) {
        if (!news) {
            return `
                <div class="featured-news">
                    <div class="featured-news-item">
                        <div class="featured-placeholder">No featured news available</div>
                    </div>
                </div>
            `;
        }

        return `
            <section class="featured-news">
                <div class="featured-news-item" data-news-slug="${news.slug}">
                    <img src="${news.featured_image}" alt="${news.title}" class="featured-image">
                    <div class="featured-overlay">
                        <span class="featured-category">${news.category?.name || 'NEWS'}</span>
                        <h2 class="featured-title">${news.title}</h2>
                        <div class="featured-meta">
                            <span><i class="far fa-clock"></i> ${this.formatDate(news.created_at)}</span>
                            <span><i class="far fa-user"></i> By ${news.author?.first_name || 'Author'}</span>
                            <span><i class="far fa-eye"></i> ${news.views_count || 0} views</span>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    /**
     * Latest news grid render kare
     */
    renderNewsGrid(newsList) {
        if (!newsList || newsList.length === 0) {
            return `
                <section class="news-grid">
                    <div class="news-grid-empty">No news available</div>
                </section>
            `;
        }

        const newsCards = newsList.map(news => `
            <div class="news-card" data-news-slug="${news.slug}">
                <img src="${news.featured_image}" alt="${news.title}" class="news-card-image">
                <div class="news-card-content">
                    <span class="news-category">${news.category?.name || 'NEWS'}</span>
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-excerpt">${news.excerpt || news.title}</p>
                    <div class="news-meta">
                        <span><i class="far fa-clock"></i> ${this.formatDate(news.created_at)}</span>
                        <span><i class="far fa-eye"></i> ${news.views_count || 0} views</span>
                    </div>
                </div>
            </div>
        `).join('');

        return `<section class="news-grid">${newsCards}</section>`;
    },

    /**
     * Breaking news ticker render kare
     */
    renderBreakingNews(newsList) {
        if (!newsList || newsList.length === 0) {
            return '';
        }

        const breakingHeadlines = newsList.map(news => `• ${news.title}`).join(' ');

        return `
            <div class="breaking-news">
                <div class="container breaking-news-content">
                    <div class="breaking-label">BREAKING NEWS</div>
                    <div class="news-ticker">
                        <div class="news-ticker-content">
                            ${breakingHeadlines}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Trending news sidebar render kare
     */
    renderTrendingSection(newsList) {
        if (!newsList || newsList.length === 0) {
            return `
                <section class="sidebar-section">
                    <h3 class="sidebar-title">TRENDING NOW</h3>
                    <div class="trending-news">
                        <p>No trending news available</p>
                    </div>
                </section>
            `;
        }

        const trendingItems = newsList.slice(0, 5).map((news, index) => `
            <div class="trending-news-item" data-news-slug="${news.slug}">
                <div class="trending-number">${String(index + 1).padStart(2, '0')}</div>
                <div class="trending-content">
                    <h4>${news.title}</h4>
                    <div class="trending-category">${news.category?.name || 'NEWS'}</div>
                </div>
            </div>
        `).join('');

        return `
            <section class="sidebar-section">
                <h3 class="sidebar-title">TRENDING NOW</h3>
                <div class="trending-news">
                    ${trendingItems}
                </div>
            </section>
        `;
    },

    /**
     * Date ko readable format me convert kare
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    },

    /**
     * Loading skeleton dikhao
     */
    showLoadingState(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="loading-skeleton">
                    <div class="skeleton-item"></div>
                    <div class="skeleton-item"></div>
                    <div class="skeleton-item"></div>
                </div>
            `;
        }
    },

    /**
     * Error message dikhao
     */
    showErrorState(containerId, message = 'Failed to load content') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>${message}</p>
                    <button class="retry-btn">Retry</button>
                </div>
            `;
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Components;
}
