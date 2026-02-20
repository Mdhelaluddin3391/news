/**
 * Main App Module
 * Sab kuch initialize aur manage karega
 */

const App = {
    // Initialize karna start
    async init() {
        console.log('🚀 Application initializing...');
        
        try {
            // Date aur time update karo
            this.initializeDateTime();
            
            // Mobile menu setup
            this.setupMobileMenu();
            
            // Search functionality
            this.setupSearch();
            
            // Newsletter form
            this.setupNewsletter();
            
            // Homepage data load karo
            await this.loadHomepageData();
            
            // Event listeners add karo
            this.setupEventListeners();
            
            console.log('✅ Application loaded successfully');
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            this.showError('Failed to load the application. Please refresh the page.');
        }
    },

    /**
     * Homepage data load karo
     */
    async loadHomepageData() {
        try {
            // Show loading state
            Components.showLoadingState('featured-section');
            Components.showLoadingState('news-grid');
            Components.showLoadingState('trending-section');

            // API se data fetch karo
            const data = await API.fetchHomePageData();

            // Featured news render karo
            if (data.featured) {
                const featuredHtml = Components.renderFeaturedNews(data.featured);
                const featuredContainer = document.querySelector('.left-column');
                if (featuredContainer) {
                    featuredContainer.insertAdjacentHTML('afterbegin', featuredHtml);
                }
            }

            // News grid render karo
            if (data.latest && data.latest.length > 0) {
                const gridHtml = Components.renderNewsGrid(data.latest);
                const gridContainer = document.querySelector('.left-column');
                if (gridContainer) {
                    gridContainer.innerHTML = gridContainer.innerHTML.replace(
                        /<section class="news-grid">(.|\n)*?<\/section>/,
                        gridHtml
                    );
                    // Agar match nahi hua to append karo
                    if (!gridContainer.innerHTML.includes('<section class="news-grid">')) {
                        gridContainer.insertAdjacentHTML('beforeend', gridHtml);
                    }
                }
            }

            // Breaking news render karo
            if (data.breaking && data.breaking.length > 0) {
                const breakingHtml = Components.renderBreakingNews(data.breaking);
                const breakingContainer = document.querySelector('header');
                if (breakingContainer) {
                    breakingContainer.insertAdjacentHTML('afterend', breakingHtml);
                }
            }

            // Trending news render karo
            if (data.trending && data.trending.length > 0) {
                const trendingHtml = Components.renderTrendingSection(data.trending);
                const trendingContainer = document.querySelector('.sidebar-section');
                if (trendingContainer) {
                    trendingContainer.parentElement.insertAdjacentHTML('afterbegin', trendingHtml);
                }
            }

            console.log('📰 Homepage data loaded successfully');
        } catch (error) {
            console.error('Error loading homepage data:', error);
            Components.showErrorState('featured-section', 'Failed to load featured news');
        }
    },

    /**
     * Date aur time update karo
     */
    initializeDateTime() {
        const updateDateTime = () => {
            const now = new Date();
            const dateElement = document.getElementById('current-date');
            const timeElement = document.getElementById('current-time');
            
            if (dateElement && timeElement) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                dateElement.textContent = now.toLocaleDateString('en-US', options);
                timeElement.textContent = now.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true
                });
            }
        };
        
        // Immediately update
        updateDateTime();
        
        // Update every minute
        setInterval(updateDateTime, 60000);
    },

    /**
     * Mobile menu setup
     */
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Mobile menu link par click kare to band karo
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
    },

    /**
     * Search functionality setup
     */
    setupSearch() {
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');
        
        if (searchButton && searchInput) {
            const performSearch = async () => {
                const query = searchInput.value.trim();
                if (query) {
                    try {
                        // Search page par jaao ya search results dikhao
                        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                    } catch (error) {
                        console.error('Search error:', error);
                        alert('Search failed. Please try again.');
                    }
                }
            };

            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    },

    /**
     * Newsletter form setup
     */
    setupNewsletter() {
        const newsletterForm = document.getElementById('newsletterForm');
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (email) {
                    try {
                        const response = await API.subscribeNewsletter(email);
                        this.showSuccess('Thank you for subscribing! Check your email for confirmation.');
                        newsletterForm.reset();
                    } catch (error) {
                        console.error('Newsletter subscription error:', error);
                        this.showError('Failed to subscribe. Please try again.');
                    }
                }
            });
        }
    },

    /**
     * News card par click handler
     */
    setupEventListeners() {
        // News cards
        document.addEventListener('click', (e) => {
            const newsCard = e.target.closest('.news-card, .featured-news-item, .trending-news-item');
            if (newsCard && newsCard.dataset.newsSlug) {
                const slug = newsCard.dataset.newsSlug;
                window.location.href = `news-detail.html?slug=${slug}`;
            }
        });
    },

    /**
     * Show success message
     */
    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    /**
     * Show error message
     */
    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Page load hone par app initialize karo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}
