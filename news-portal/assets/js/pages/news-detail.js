import { initLayout } from "../components/layout.js";
import { NewsService } from "../services/news.service.js";
import { getQueryParam } from "../core/utils.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  const id = getQueryParam("id");
  const article = await NewsService.getById(id);

  if (!article) return location.href = "/404.html";

  document.getElementById("article-title").textContent = article.title;
  document.getElementById("article-content").innerHTML =
    `<p>${article.excerpt}</p><p>${article.content}</p>`;
});