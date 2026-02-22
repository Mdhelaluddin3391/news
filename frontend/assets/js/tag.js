// Tag Page Script
import { initComponents } from './app.js';

const updateDateTime = () => {
  const now = new Date();
  const dateElement = document.getElementById('current-date');
  const timeElement = document.getElementById('current-time');
  if (dateElement && timeElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
    timeElement.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
};

const init = async () => {
  await initComponents();

  // Update date/time
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Tag search functionality
  const searchBar = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchBar ? searchBar.value.trim() : '';
      if (query) {
        alert(`Searching tags for: "${query}"`);
        if (searchBar) searchBar.value = '';
      }
    });
  }

  // Tag filter buttons
  const filterButtons = document.querySelectorAll('.tag-filter-btn, .filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const tag = this.textContent;
      alert(`Showing articles for tag: ${tag}`);
    });
  });

  // Tag item click functionality
  const tagItems = document.querySelectorAll('.tag-item, .tag-card');
  tagItems.forEach((item) => {
    item.addEventListener('click', () => {
      const tagName = item.textContent.trim();
      alert(`Viewing articles tagged with: "${tagName}"`);
    });
  });

  // Follow tag button
  const followTagBtns = document.querySelectorAll('.follow-tag-btn, .tag-follow');
  followTagBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isFollowing = this.classList.contains('following');
      if (!isFollowing) {
        this.classList.add('following');
        this.innerHTML = '<i class="fas fa-check"></i> Following';
        alert('You are now following this tag!');
      } else {
        this.classList.remove('following');
        this.innerHTML = '<i class="fas fa-plus"></i> Follow';
        alert('You have unfollowed this tag.');
      }
    });
  });

  // Related articles functionality
  document.addEventListener('click', function (e) {
    if (e.target.closest('.related-article, .article-link')) {
      const article = e.target.closest('.related-article, .article-link');
      if (article) {
        const title = article.querySelector('h3, h4, .title')?.textContent || 'Article';
        alert(`Loading article: "${title}"`);
      }
    }
  });

  // Sort functionality
  const sortButtons = document.querySelectorAll('.sort-btn, .sort-option');
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const sortType = this.textContent.trim();
      alert(`Sorting articles by: ${sortType}`);
    });
  });
};

document.addEventListener('DOMContentLoaded', init);
