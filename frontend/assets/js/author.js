// Author Page Script
import { initComponents } from './app.js';

const updateDateTime = () => {
  const now = new Date();
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
};

const init = async () => {
  await initComponents();
  updateDateTime();
  setInterval(updateDateTime, 60000);

  // Author follow button
  const followBtn = document.querySelector('.author-follow-btn, .follow-btn');
  if (followBtn) {
    followBtn.addEventListener('click', function () {
      const isFollowing = this.classList.contains('following');
      if (!isFollowing) {
        this.classList.add('following');
        this.textContent = 'Following ✓';
        alert('You are now following this author!');
      } else {
        this.classList.remove('following');
        this.textContent = 'Follow';
        alert('You have unfollowed this author.');
      }
    });
  }

  // Social share buttons
  const socialLinks = document.querySelectorAll('.author-social a, .social-share a');
  socialLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const platform = this.className;
      if (platform) {
        alert(`Share on ${platform.toUpperCase()} - In full implementation, this would open share dialog.`);
      }
    });
  });

  // Send email to author
  const emailBtn = document.querySelector('a[href*="mailto"]');
  if (emailBtn) {
    emailBtn.addEventListener('click', function (e) {
      alert('Email compose window would open with the author\'s email address.');
    });
  }

  // Article filter by date
  const filterButtons = document.querySelectorAll('.filter-btn, .date-filter button');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterButtons.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const period = this.textContent;
      alert(`Filtering articles by: ${period}`);
    });
  });
};

document.addEventListener('DOMContentLoaded', init);
