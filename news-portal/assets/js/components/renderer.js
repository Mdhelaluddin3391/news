export const renderNewsCard = (a) => `
  <div class="news-card">
    <img src="${a.image}" alt="${a.title}">
    <h3><a href="/news-detail.html?id=${a.id}">${a.title}</a></h3>
    <p>${a.excerpt}</p>
  </div>
`;

export const renderTrendingItem = (a, i) => `
  <div class="trending-item">
    <span>${i + 1}</span>
    <a href="/news-detail.html?id=${a.id}">${a.title}</a>
  </div>
`;