// Thin adapter to allow swapping between the local fake `api.js` and a real backend.
import * as localApi from './api.js';

// Toggle to use remote HTTP backend instead of the local fake API.
const USE_REMOTE = false;
const REMOTE_BASE = 'http://localhost:8000/api';

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
};

export const fetchCategories = async () => {
  if (!USE_REMOTE) return localApi.fetchCategories();
  const res = await fetch(`${REMOTE_BASE}/categories/`);
  return handleResponse(res);
};

export const fetchTrendingNews = async () => {
  if (!USE_REMOTE) return localApi.fetchTrendingNews();
  const res = await fetch(`${REMOTE_BASE}/trending/`);
  return handleResponse(res);
};

export const fetchBreakingNews = async () => {
  if (!USE_REMOTE) return localApi.fetchBreakingNews();
  const res = await fetch(`${REMOTE_BASE}/breaking/`);
  return handleResponse(res);
};

export const fetchNewsByCategory = async (slug) => {
  if (!USE_REMOTE) return localApi.fetchNewsByCategory(slug);
  const res = await fetch(`${REMOTE_BASE}/category/${encodeURIComponent(slug)}/`);
  return handleResponse(res);
};

export const fetchArticleById = async (id) => {
  if (!USE_REMOTE) return localApi.fetchArticleById(id);
  const res = await fetch(`${REMOTE_BASE}/news/${encodeURIComponent(id)}/`);
  return handleResponse(res);
};

export const searchNews = async (q) => {
  if (!USE_REMOTE) return localApi.searchNews(q);
  const res = await fetch(`${REMOTE_BASE}/search/?q=${encodeURIComponent(q)}`);
  return handleResponse(res);
};

export const fetchRelatedArticles = async (articleId, limit = 3) => {
  if (!USE_REMOTE) return localApi.fetchRelatedArticles(articleId, limit);
  const res = await fetch(`${REMOTE_BASE}/news/${encodeURIComponent(articleId)}/related/?limit=${limit}`);
  return handleResponse(res);
};

export const loginUser = async (credentials) => {
  if (!USE_REMOTE) return localApi.loginUser(credentials);
  const res = await fetch(`${REMOTE_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
};

export const fetchUserProfile = async () => {
  if (!USE_REMOTE) return localApi.fetchUserProfile();
  const res = await fetch(`${REMOTE_BASE}/user/profile/`);
  return handleResponse(res);
};

export const saveArticleForUser = async (articleId) => {
  if (!USE_REMOTE) return localApi.saveArticleForUser(articleId);
  const res = await fetch(`${REMOTE_BASE}/user/saved/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId }),
  });
  return handleResponse(res);
};

export const removeSavedArticleForUser = async (articleId) => {
  if (!USE_REMOTE) return localApi.removeSavedArticleForUser(articleId);
  const res = await fetch(`${REMOTE_BASE}/user/saved/${encodeURIComponent(articleId)}/`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

export const fetchSavedArticles = async () => {
  if (!USE_REMOTE) return localApi.fetchSavedArticles();
  const res = await fetch(`${REMOTE_BASE}/user/saved/`);
  return handleResponse(res);
};

export default {
  fetchCategories,
  fetchTrendingNews,
  fetchBreakingNews,
  fetchNewsByCategory,
  fetchArticleById,
  searchNews,
  fetchRelatedArticles,
  loginUser,
  fetchUserProfile,
  saveArticleForUser,
  removeSavedArticleForUser,
  fetchSavedArticles,
};
