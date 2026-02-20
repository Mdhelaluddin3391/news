/**
 * Utility Functions Module
 * Common helper functions
 */

const Utils = {
    /**
     * Local storage me data save karo
     */
    setLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to local storage:', error);
            return false;
        }
    },

    /**
     * Local storage se data lao
     */
    getLocalStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from local storage:', error);
            return null;
        }
    },

    /**
     * Local storage se data remove karo
     */
    removeLocalStorage(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from local storage:', error);
            return false;
        }
    },

    /**
     * Debounce function - jab user type karega tab wait kerega
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function - function ko har wait ms ke baad call karega
     */
    throttle(func, wait) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, wait);
            }
        };
    },

    /**
     * URL parameters get karo
     */
    getUrlParameter(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    },

    /**
     * Text ko truncate karo
     */
    truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    },

    /**
     * Image load hone ka wait karo
     */
    async preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    },

    /**
     * Multiple URLs ke images preload karo
     */
    async preloadImages(urls) {
        try {
            await Promise.all(urls.map(url => this.preloadImage(url)));
            return true;
        } catch (error) {
            console.error('Error preloading images:', error);
            return false;
        }
    },

    /**
     * Check karo internet connection hai ya nahi
     */
    isOnline() {
        return navigator.onLine;
    },

    /**
     * Generate random ID
     */
    generateId() {
        return '_' + Math.random().toString(36).substring(2, 9);
    },

    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Sort array of objects
     */
    sortByProperty(array, property, ascending = true) {
        return [...array].sort((a, b) => {
            if (ascending) {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
    },

    /**
     * Filter array of objects
     */
    filterByProperty(array, property, value) {
        return array.filter(item => item[property] === value);
    },

    /**
     * Format number as currency
     */
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    /**
     * Format number with thousand separator
     */
    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate phone number
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    /**
     * Sanitize HTML to prevent XSS
     */
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
