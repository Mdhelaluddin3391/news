// File: news-portal/assets/js/components/layout.js
const loadComponent = async (path, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Component not found");
    el.innerHTML = await res.text();
  } catch (error) {
    console.error(`Error loading ${path}:`, error);
  }
};

export const initLayout = async () => {
  await loadComponent("components/navbar.html", "navbar-placeholder");
  await loadComponent("components/footer.html", "footer-placeholder");

  if (document.getElementById("sidebar-placeholder")) {
    await loadComponent("components/sidebar.html", "sidebar-placeholder");
  }
};