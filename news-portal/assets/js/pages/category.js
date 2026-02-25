import { initLayout } from "../components/layout.js";
import { NewsService } from "../services/news.service.js";
import { getQueryParam } from "../core/utils.js";
import { renderNewsCard } from "../components/renderer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  const slug = getQueryParam("slug");
  const articles = await NewsService.getByCategory(slug);

  document.getElementById("category-news-grid").innerHTML =
    articles.map(renderNewsCard).join("");
});