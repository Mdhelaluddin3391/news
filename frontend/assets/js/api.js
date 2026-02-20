/**
 * API Utility Module
 * Backend se data fetch karega
 */

const API_BASE_URL = 'http://localhost:8000/api';

const API = {
    // Homepage data fetch kare
    async fetchHomePageData() {
        try {
            const response = await fetch(`${API_BASE_URL}/home/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching homepage data:', error);
            throw error;
        }
    },

    // Search news
    async searchNews(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/search/?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching news:', error);
            throw error;
        }
    },

    // Category ke hisaab se news
    async fetchNewsByCategory(categoryName) {
        try {
            const response = await fetch(`${API_BASE_URL}/category/${categoryName}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching category news:', error);
            throw error;
        }
    },

    // Single news article
    async fetchNewsArticle(slug) {
        try {
            const response = await fetch(`${API_BASE_URL}/news/${slug}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching article:', error);
            throw error;
        }
    },

    // Newsletter subscribe
    async subscribeNewsletter(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/newsletter/subscribe/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            throw error;
        }
    },

    // Get trending news
    async fetchTrendingNews() {
        try {
            const response = await fetch(`${API_BASE_URL}/trending/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching trending news:', error);
            throw error;
        }
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
