import {
  fetchTrendingNews,
  fetchBreakingNews,
  fetchNewsByCategory,
  fetchArticleById
} from "../core/api-adapter.js";

export const NewsService = {
  getTrending: fetchTrendingNews,
  getBreaking: fetchBreakingNews,
  getByCategory: fetchNewsByCategory,
  getById: fetchArticleById
};