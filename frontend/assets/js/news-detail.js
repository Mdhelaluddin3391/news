/**
 * News Detail Page Module
 * Single article ko load aur display karega
 */

const NewsDetail = {
    currentArticle: null,

    async init() {
        console.log('📰 News detail page initializing...');
        
        try {
            // Date aur time setup
            this.initializeDateTime();
            
            // Mobile menu
            this.setupMobileMenu();
            
            // Get article slug from URL
            const slug = Utils.getUrlParameter('slug');
            
            if (!slug) {
                throw new Error('No article slug provided');
            }

            // Article load karo
            await this.loadArticle(slug);
            
            // Setup event listeners
            this.setupEventListeners();
            
            console.log('✅ News detail page loaded');
        } catch (error) {
            console.error('❌ Error loading article:', error);
            this.showError(error.message || 'Failed to load article');
        }
    },

    /**
     * Article load karo
     */
    async loadArticle(slug) {
        try {
            Components.showLoadingState('article-section');
            
            const article = await API.fetchNewsArticle(slug);
            this.currentArticle = article;
            
            // Article HTML render karo
            const articleHtml = this.renderArticle(article);
            const articleSection = document.getElementById('article-section');
            if (articleSection) {
                articleSection.innerHTML = articleHtml;
            }

            // Breadcrumb aur title update karo
            this.updatePageMetadata(article);
            
            // Related articles load karo
            await this.loadRelatedArticles(article.category?.id);
        } catch (error) {
            Components.showErrorState('article-section', error.message);
            throw error;
        }
    },

    /**
     * Article HTML render karo
     */
    renderArticle(article) {
        const publishDate = Components.formatDate(article.created_at);
        const categoryName = article.category?.name || 'News';
        const authorName = article.author?.first_name || 'Anonymous';

        return `
            <article class="article">
                <div class="article-header">
                    <div class="breadcrumb">
                        <a href="index.html">Home</a>
                        <span>/</span>
                        <a href="category.html?category=${article.category?.slug}">${categoryName}</a>
                        <span>/</span>
                        <span>${article.title}</span>
                    </div>
                    
                    <h1 class="article-title">${article.title}</h1>
                    
                    <div class="article-meta">
                        <div class="article-meta-left">
                            <span class="article-author">
                                <i class="fas fa-user"></i> By ${authorName}
                            </span>
                            <span class="article-date">
                                <i class="fas fa-calendar"></i> ${publishDate}
                            </span>
                        </div>
                        <div class="article-meta-right">
                            <span class="article-views">
                                <i class="fas fa-eye"></i> ${article.views_count || 0} views
                            </span>
                            <span class="article-reading-time">
                                <i class="fas fa-hourglass-half"></i> ${this.estimateReadingTime(article.content)} min read
                            </span>
                        </div>
                    </div>

                    <div class="article-share">
                        <span>Share:</span>
                        <a href="#" class="share-btn facebook" title="Share on Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="share-btn twitter" title="Share on Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="share-btn linkedin" title="Share on LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="share-btn whatsapp" title="Share on WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>

                <div class="article-featured-image">
                    <img src="${article.featured_image}" alt="${article.title}">
                    <p class="image-caption">${article.title}</p>
                </div>

                <div class="article-body">
                    ${article.content}
                </div>

                <div class="article-footer">
                    <div class="article-tags">
                        <strong>Tags:</strong>
                        ${article.tags?.map(tag => `
                            <a href="tag.html?tag=${tag.slug}" class="article-tag">${tag.name}</a>
                        `).join('') || '<span>No tags</span>'}
                    </div>

                    <div class="article-category">
                        <strong>Category:</strong>
                        <a href="category.html?category=${article.category?.slug}">
                            ${categoryName}
                        </a>
                    </div>
                </div>
            </article>
        `;
    },

    /**
     * Reading time estimate karo
     */
    estimateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    },

    /**
     * Related articles load karo
     */
    async loadRelatedArticles(categoryId) {
        try {
            if (!categoryId) return;

            // Ideally, you'd fetch related articles from API
            // For now, just show a placeholder
            const relatedSection = document.getElementById('related-articles');
            if (relatedSection) {
                relatedSection.innerHTML = `
                    <div class="related-articles-list">
                        <p style="color: var(--text-light); text-align: center; padding: 20px;">
                            Related articles feature coming soon...
                        </p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading related articles:', error);
        }
    },

    /**
     * Page metadata update karo (title, etc.)
     */
    updatePageMetadata(article) {
        document.title = `${article.title} | Global News Network`;
        
        // Meta description update karo
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = article.excerpt || article.title;
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
        
        updateDateTime();
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

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
    },

    /**
     * Event listeners setup
     */
    setupEventListeners() {
        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareArticle(btn);
            });
        });

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                try {
                    await API.subscribeNewsletter(email);
                    this.showSuccess('Successfully subscribed to newsletter!');
                    newsletterForm.reset();
                } catch (error) {
                    this.showError('Failed to subscribe. Please try again.');
                }
            });
        }

        // Tag clicks
        document.querySelectorAll('.article-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                e.preventDefault();
                const tagSlug = tag.getAttribute('href');
                window.location.href = tagSlug;
            });
        });
    },

    /**
     * Article share کریں
     */
    shareArticle(btn) {
        if (!this.currentArticle) return;

        const platform = btn.classList.contains('facebook') ? 'facebook' :
                        btn.classList.contains('twitter') ? 'twitter' :
                        btn.classList.contains('linkedin') ? 'linkedin' :
                        'whatsapp';

        const title = this.currentArticle.title;
        const url = window.location.href;

        let shareUrl = '';

        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(title + '\n' + url)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
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

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        NewsDetail.init();
    });
} else {
    NewsDetail.init();
}
