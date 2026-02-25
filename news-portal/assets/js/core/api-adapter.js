import * as localApi from "./api.js";
import { CONFIG } from "./config.js";

const handle = async (res) => {
  if (!res.ok) throw new Error("API error");
  return res.json();
};

export const fetchTrendingNews = async () => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchTrendingNews();
  return handle(await fetch(`${CONFIG.API_BASE}/trending/`));
};

export const fetchBreakingNews = async () => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchBreakingNews();
  return handle(await fetch(`${CONFIG.API_BASE}/breaking/`));
};

export const fetchArticleById = async (id) => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchArticleById(id);
  return handle(await fetch(`${CONFIG.API_BASE}/news/${id}/`));
};

export const searchNews = async (q) => {
  if (!CONFIG.USE_REMOTE) return localApi.searchNews(q);
  return handle(await fetch(`${CONFIG.API_BASE}/search/?q=${q}`));
};

export const fetchNewsByCategory = async (slug) => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchNewsByCategory(slug);
  return handle(await fetch(`${CONFIG.API_BASE}/category/${slug}/`));
};

export const fetchSavedArticles = async () => {
  return localApi.fetchSavedArticles();
};

export const loginUser = async (credentials) => {
  return localApi.loginUser(credentials);
};