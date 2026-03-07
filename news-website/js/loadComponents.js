async function loadComponents() {
    try {
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const headerRes = await fetch('components/header.html');
            headerPlaceholder.innerHTML = await headerRes.text();
            initHeaderScripts();
        }

        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerRes = await fetch('components/footer.html');
            footerPlaceholder.innerHTML = await footerRes.text();
        }

        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
    } catch (error) {
        console.error(error);
    }
}

function initHeaderScripts() {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeBtn");

    if (menuBtn && mobileMenu && closeBtn) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.add("active");
            document.body.classList.add("no-scroll");
        });
        
        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    }

    function updateDateTime() {
        const dateTimeEl = document.getElementById("dateTime");
        if (dateTimeEl) {
            dateTimeEl.innerText = new Date().toDateString() + " | " + new Date().toLocaleTimeString();
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    const inlineSearchForm = document.querySelector('.search-form-inline');
    if (inlineSearchForm) {
        inlineSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = inlineSearchForm.querySelector('input').value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // YAHAN HUMNE NAYA FUNCTION CALL KIYA HAI 👇
    fetchAndRenderNavCategories();
}

// 🔴 NAYA FUNCTION: Categories ko backend se laakar Header me set karne ke liye 🔴
async function fetchAndRenderNavCategories() {
    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/news/categories/`);
        if (!response.ok) return;
        const data = await response.json();
        const categories = data.results || data;

        const desktopNav = document.getElementById('desktop-nav-categories');
        const mobileNav = document.getElementById('mobile-nav-categories');

        // Check karte hain user kis category page par hai (taaki usko highlight kar sakein)
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category') || 'general';

        let desktopHtml = `<li><a href="index.html?category=general" class="category-link ${currentCategory === 'general' ? 'active' : ''}">Home</a></li>`;
        let mobileHtml = `<a href="index.html?category=general" class="${currentCategory === 'general' ? 'active' : ''}">Home</a>`;

        categories.forEach(cat => {
            const isActive = currentCategory === cat.slug ? 'active' : '';
            desktopHtml += `<li><a href="index.html?category=${cat.slug}" class="category-link ${isActive}">${cat.name}</a></li>`;
            mobileHtml += `<a href="index.html?category=${cat.slug}" class="${isActive}">${cat.name}</a>`;
        });

        if (desktopNav) desktopNav.innerHTML = desktopHtml;
        if (mobileNav) mobileNav.innerHTML = mobileHtml;

    } catch (error) {
        console.error('Failed to load categories for nav:', error);
    }
}

document.addEventListener('click', (e) => {
    const logoutBtn = e.target.closest('.logout-link') || e.target.closest('#logout-link') || e.target.closest('#logout-link-mobile');
    if (logoutBtn) {
        e.preventDefault();
        if (typeof logoutUser === 'function') {
            logoutUser();
            if (typeof updateAuthUI === 'function') updateAuthUI();
            window.location.href = 'index.html';
        }
    }
});

document.addEventListener('DOMContentLoaded', loadComponents);