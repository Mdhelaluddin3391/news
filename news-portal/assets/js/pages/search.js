import { initLayout } from "../components/layout.js";
import { searchNews } from "../core/api-adapter.js";
import { getQueryParam } from "../core/utils.js";
import { renderNewsCard } from "../components/renderer.js";

document.addEventListener("DOMContentLoaded", async () => {
  await initLayout();

  const q = getQueryParam("q");
  const results = await searchNews(q);

  document.getElementById("search-results").innerHTML =
    results.map(renderNewsCard).join("");
});