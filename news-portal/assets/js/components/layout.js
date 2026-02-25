const loadComponent = async (path, id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(path);
  el.innerHTML = await res.text();
};

export const initLayout = async () => {
  await loadComponent("/components/navbar.html", "navbar-placeholder");
  await loadComponent("/components/footer.html", "footer-placeholder");

  if (document.getElementById("sidebar-placeholder")) {
    await loadComponent("/components/sidebar.html", "sidebar-placeholder");
  }
};