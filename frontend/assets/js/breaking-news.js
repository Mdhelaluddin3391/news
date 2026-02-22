// Breaking News Page Script
import { initComponents } from './app.js';
import { fetchBreakingNews } from './api-adapter.js';
import { Components } from './components.js';

// Mock breaking news feed data
const breakingNewsFeed = [
  {
    time: '14:35',
    category: 'EARTHQUAKE',
    title: 'Major Earthquake Strikes Region, Early Reports of Significant Damage',
    content: 'A powerful earthquake measuring 7.2 on the Richter scale has struck the region. Early reports indicate substantial damage to infrastructure.',
    source: 'Seismic Center',
    type: 'critical'
  },
  {
    time: '14:28',
    category: 'TSUNAMI',
    title: 'Tsunami Warning Issued for Coastal Areas',
    content: 'Officials have issued a tsunami warning. Residents in coastal areas are advised to move to higher ground immediately.',
    source: 'Coastal Authority',
    type: 'critical'
  },
  {
    time: '14:15',
    category: 'RESCUE',
    title: 'Emergency Response Teams Mobilized',
    content: 'National and international rescue teams are being dispatched to affected areas.',
    source: 'Emergency Management',
    type: 'update'
  }
];

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

const renderLiveFeed = () => {
  const liveFeed = document.getElementById('liveFeed');
  if (!liveFeed) return;
  liveFeed.innerHTML = '';

  breakingNewsFeed.forEach((item) => {
    const feedItem = document.createElement('div');
    feedItem.className = `feed-item ${item.type}`;

    feedItem.innerHTML = `
      <div class="feed-time">
        <i class="far fa-clock"></i>
        <span>${item.time} | LIVE</span>
      </div>
      <div class="feed-category">${item.category}</div>
      <h4 class="feed-title">${item.title}</h4>
      <div class="feed-content">${item.content}</div>
      <div class="feed-meta">
        <div class="feed-source">Source: ${item.source}</div>
        <div>
          <a href="#" class="comment-action">Follow</a> | 
          <a href="#" class="comment-action">Share</a>
        </div>
      </div>
    `;

    liveFeed.appendChild(feedItem);
  });
};

const showBannerNotification = (message) => {
  const liveUpdatesBanner = document.getElementById('liveUpdatesBanner');
  const bannerMessage = document.getElementById('bannerMessage');
  if (!liveUpdatesBanner || !bannerMessage) return;

  bannerMessage.textContent = message;
  liveUpdatesBanner.classList.add('show');

  setTimeout(() => {
    liveUpdatesBanner.classList.remove('show');
  }, 30000);
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

  // Initialize live feed
  renderLiveFeed();

  // Refresh feed functionality
  const refreshFeedBtn = document.getElementById('refreshFeedBtn');
  if (refreshFeedBtn) {
    refreshFeedBtn.addEventListener('click', function () {
      this.classList.add('spinning');

      setTimeout(() => {
        this.classList.remove('spinning');

        const newUpdateTime = new Date();
        const timeString = `${newUpdateTime.getHours()}:${newUpdateTime
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

        const newUpdates = [
          {
            time: timeString,
            category: 'UPDATE',
            title: 'Rescue teams report successful extraction of 15 people from collapsed building',
            content: 'Latest reports indicate successful rescue operations with more teams arriving on scene.',
            source: 'Rescue Command',
            type: 'update'
          },
          {
            time: timeString,
            category: 'ECONOMY',
            title: 'Government announces emergency economic stimulus package',
            content: 'New measures aim to support businesses and individuals affected by recent events.',
            source: 'Treasury Dept',
            type: 'update'
          }
        ];

        breakingNewsFeed.unshift(...newUpdates);

        if (breakingNewsFeed.length > 12) {
          breakingNewsFeed.length = 12;
        }

        const updatesElement = document.getElementById('updates-today');
        if (updatesElement) {
          updatesElement.textContent = parseInt(updatesElement.textContent) + newUpdates.length;
        }

        renderLiveFeed();
        showBannerNotification(`${newUpdates.length} new updates available`);
      }, 1500);
    });
  }

  // Follow story button
  const followStoryBtn = document.getElementById('followStoryBtn');
  if (followStoryBtn) {
    followStoryBtn.addEventListener('click', function () {
      const isFollowing = this.classList.contains('following');

      if (!isFollowing) {
        this.innerHTML = '<i class="fas fa-bell-slash"></i> Unfollow Story';
        this.classList.add('following');
        alert('You are now following this breaking news story. You will receive alerts for major updates.');
      } else {
        this.innerHTML = '<i class="fas fa-bell"></i> Follow This Story';
        this.classList.remove('following');
        alert('You have unfollowed this story.');
      }
    });
  }

  // Safety info button
  const safetyInfoBtn = document.getElementById('safetyInfoBtn');
  if (safetyInfoBtn) {
    safetyInfoBtn.addEventListener('click', function () {
      alert(
        'SAFETY INFORMATION:\n\n1. During earthquakes: Drop, Cover, and Hold On\n2. If near coast and tsunami warning: Move to higher ground immediately\n3. Have emergency supplies ready\n4. Follow official instructions from authorities\n5. Check on neighbors, especially elderly or disabled'
      );
    });
  }

  // Live updates banner
  const liveUpdatesBanner = document.getElementById('liveUpdatesBanner');
  const dismissBannerBtn = document.getElementById('dismissBannerBtn');
  const loadUpdatesBtn = document.getElementById('loadUpdatesBtn');

  if (dismissBannerBtn) {
    dismissBannerBtn.addEventListener('click', () => {
      if (liveUpdatesBanner) liveUpdatesBanner.style.display = 'none';
    });
  }

  if (loadUpdatesBtn && refreshFeedBtn) {
    loadUpdatesBtn.addEventListener('click', () => {
      refreshFeedBtn.click();
      if (liveUpdatesBanner) liveUpdatesBanner.classList.remove('show');
    });
  }

  // Feed item click functionality
  document.addEventListener('click', function (e) {
    if (e.target.closest('.feed-item')) {
      const feedItem = e.target.closest('.feed-item');
      const title = feedItem.querySelector('.feed-title').textContent;
      alert(
        `Opening detailed update: "${title}"\nIn a full implementation, this would show detailed information about this breaking news update.`
      );
    }

    if (e.target.closest('.top-breaking-item') || e.target.closest('.developing-story')) {
      const item = e.target.closest('.top-breaking-item') || e.target.closest('.developing-story');
      const title = item.querySelector('h4').textContent;
      alert(
        `Opening breaking story: "${title}"\nThis would navigate to a detailed article about this breaking news story.`
      );
    }
  });

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const query = searchInput ? searchInput.value.trim() : '';
      if (query) {
        alert(
          `Searching breaking news for: "${query}"\nThis would filter the live feed to show only relevant updates.`
        );
        if (searchInput) searchInput.value = '';
      }
    });
  }

  // Emergency list item click
  const emergencyItems = document.querySelectorAll('.emergency-list li');
  emergencyItems.forEach((item) => {
    item.addEventListener('click', () => {
      const infoText = item.textContent;
      alert(
        `Emergency Information: ${infoText}\nThis would provide detailed instructions or contact information.`
      );
    });
  });

  // Initialize with banner after page loads
  setTimeout(() => {
    showBannerNotification('Live breaking news feed is active. Updates every 2-5 minutes.');
  }, 3000);
};

document.addEventListener('DOMContentLoaded', init);
