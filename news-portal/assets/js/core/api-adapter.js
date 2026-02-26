// File: news-portal/assets/js/core/api-adapter.js
import * as localApi from "./api.js";
import { CONFIG } from "./config.js";

const handle = async (res) => {
  if (!res.ok) throw new Error("API error");
  return res.json();
};

export const fetchTrendingNews = async () => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchTrendingNews();
  // URL ko `${CONFIG.API_BASE}/trending/` se badal kar niche wala karein
  return handle(await fetch(`${CONFIG.API_BASE}/news/trending/`)); 
};

export const fetchBreakingNews = async () => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchBreakingNews();
  // URL ko `${CONFIG.API_BASE}/breaking/` se badal kar niche wala karein
  return handle(await fetch(`${CONFIG.API_BASE}/news/breaking/`));
};

export const fetchArticleById = async (id) => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchArticleById(id);
  return handle(await fetch(`${CONFIG.API_BASE}/news/${id}/`)); // Ye pehle se theek hai
};

export const searchNews = async (q) => {
  if (!CONFIG.USE_REMOTE) return localApi.searchNews(q);
  return handle(await fetch(`${CONFIG.API_BASE}/search/?q=${q}`)); // Ye bhi theek hai
};

export const fetchNewsByCategory = async (slug) => {
  if (!CONFIG.USE_REMOTE) return localApi.fetchNewsByCategory(slug);
  // URL ko `${CONFIG.API_BASE}/category/${slug}/` se badal kar niche wala karein
  return handle(await fetch(`${CONFIG.API_BASE}/news/category/${slug}/`));
};

export const fetchSavedArticles = async () => {
  // Dhyan dein: Yahan abhi remote fetch add nahi hai, 
  // jab aap aage dashboard banayenge tab isko add karna padega.
  return localApi.fetchSavedArticles();
};

export const loginUser = async (credentials) => {
  // Yahan par bhi backend auth fetch call likhna baki hai aage ke liye
  return localApi.loginUser(credentials);
};