// File: news-portal/assets/js/core/api-adapter.js
import { CONFIG } from "./config.js";

const handle = async (res) => {
  if (!res.ok) throw new Error("API error");
  return res.json();
};

export const fetchTrendingNews = async () => {
  return handle(await fetch(`${CONFIG.API_BASE}/news/trending/`)); 
};

export const fetchBreakingNews = async () => {
  return handle(await fetch(`${CONFIG.API_BASE}/news/breaking/`));
};

export const fetchArticleById = async (id) => {
  return handle(await fetch(`${CONFIG.API_BASE}/news/${id}/`)); 
};

export const searchNews = async (q) => {
  return handle(await fetch(`${CONFIG.API_BASE}/search/?q=${q}`)); 
};

export const fetchNewsByCategory = async (slug) => {
  return handle(await fetch(`${CONFIG.API_BASE}/news/category/${slug}/`));
};

// JWT Token ke sath secure API call
export const fetchSavedArticles = async () => {
  const token = localStorage.getItem("access_token");
  return handle(await fetch(`${CONFIG.API_BASE}/interactions/saved/`, {
    headers: {
        "Authorization": `Bearer ${token}`
    }
  }));
};

// Real Django Backend Auth 
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${CONFIG.API_BASE}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    if (res.ok) {
      const data = await res.json();
      // Token ko browser ki local storage mein save karein
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error("Login request failed", error);
    return { success: false };
  }
};