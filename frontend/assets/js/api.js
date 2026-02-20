// Fake API layer simulating asynchronous backend calls
// Uses mock data from mock-data.js and returns Promises with delays

import { categories, articles, userProfile, comments, siteStats, teamMembers, contactInfo, offices } from './mock-data.js';

const randomDelay = (min = 200, max = 800) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const simulateDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper to clone objects so callers don't accidentally mutate module state
const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const fetchCategories = async () => {
  await simulateDelay(randomDelay());
  return clone(categories);
};

export const fetchTrendingNews = async () => {
  await simulateDelay(randomDelay());
  return clone(articles.filter((a) => a.is_trending));
};

export const fetchBreakingNews = async () => {
  await simulateDelay(randomDelay());
  return clone(articles.filter((a) => a.is_breaking));
};

export const fetchNewsByCategory = async (slug) => {
  await simulateDelay(randomDelay());
  return clone(articles.filter((a) => a.category_slug === slug));
};

export const fetchComments = async (articleId) => {
  await simulateDelay(randomDelay());
  return clone(comments.filter((c) => String(c.article_id) === String(articleId)));
};

export const addComment = async (articleId, { author, email, text }) => {
  await simulateDelay(randomDelay());
  const newComment = {
    id: Date.now(),
    article_id: Number(articleId),
    author: author || 'Anonymous',
    email: email || '',
    text: text || '',
    date: new Date().toISOString()
  };
  comments.push(newComment);
  return clone(newComment);
};

export const fetchArticleById = async (id) => {
  await simulateDelay(randomDelay());
  const found = articles.find((a) => String(a.id) === String(id));
  if (!found) return null;
  // simulate incrementing view count in-memory
  found.views += 1;
  return clone(found);
};

export const searchNews = async (q) => {
  await simulateDelay(randomDelay());
  const term = String(q || '').trim().toLowerCase();
  if (!term) return [];
  const results = articles.filter((a) => {
    return (
      a.title.toLowerCase().includes(term) ||
      a.excerpt.toLowerCase().includes(term) ||
      a.content.toLowerCase().includes(term)
    );
  });
  return clone(results);
};

export const fetchRelatedArticles = async (articleId, limit = 3) => {
  await simulateDelay(randomDelay());
  const current = articles.find((a) => String(a.id) === String(articleId));
  if (!current) return [];
  const related = articles
    .filter((a) => a.category_slug === current.category_slug && a.id !== current.id)
    .slice(0, limit);
  return clone(related);
};

// Simple auth simulation: returns a fake token when email matches
export const loginUser = async ({ email }) => {
  await simulateDelay(randomDelay());
  if (String(email).toLowerCase() === String(userProfile.email).toLowerCase()) {
    return { success: true, token: 'fake-jwt-token', profile: clone(userProfile) };
  }
  return { success: false, message: 'Invalid credentials' };
};

export const fetchUserProfile = async () => {
  await simulateDelay(randomDelay());
  return clone(userProfile);
};

export const saveArticleForUser = async (articleId) => {
  await simulateDelay(randomDelay());
  if (!userProfile.saved_articles.includes(articleId)) {
    userProfile.saved_articles.push(articleId);
  }
  return clone(userProfile);
};

export const removeSavedArticleForUser = async (articleId) => {
  await simulateDelay(randomDelay());
  userProfile.saved_articles = userProfile.saved_articles.filter((id) => id !== articleId);
  return clone(userProfile);
};

export const fetchSavedArticles = async () => {
  await simulateDelay(randomDelay());
  const saved = articles.filter((a) => userProfile.saved_articles.includes(a.id));
  return clone(saved);
};

export const fetchSiteStats = async () => {
  await simulateDelay(randomDelay());
  // siteStats exported from mock-data.js
  return clone(typeof siteStats !== 'undefined' ? siteStats : {
    years: 25,
    countries: 150,
    journalists: 500,
    monthly_readers: '50M+'
  });
};

export const fetchTeamMembers = async () => {
  await simulateDelay(randomDelay());
  return clone(typeof teamMembers !== 'undefined' ? teamMembers : []);
};

export const fetchContactInfo = async () => {
  await simulateDelay(randomDelay());
  return clone(typeof contactInfo !== 'undefined' ? contactInfo : {});
};

export const fetchOffices = async () => {
  await simulateDelay(randomDelay());
  return clone(typeof offices !== 'undefined' ? offices : []);
};
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
