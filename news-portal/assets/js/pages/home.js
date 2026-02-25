import { initLayout } from "../components/layout.js";
import { NewsService } from "../services/news.service.js";
import { renderNewsCard, renderTrendingItem } from "../components/renderer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  const [breaking, trending] = await Promise.all([
    NewsService.getBreaking(),
    NewsService.getTrending()
  ]);

  const breakingEl = document.getElementById("breaking-placeholder");
  if (breakingEl) {
    breakingEl.innerHTML = breaking.map(n => `• ${n.title}`).join(" ");
  }

  const trendingEl = document.getElementById("trending-placeholder");
  if (trendingEl) {
    trendingEl.innerHTML = trending.map(renderTrendingItem).join("");
  }
});