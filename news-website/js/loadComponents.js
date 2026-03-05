// Function to load HTML components
async function loadComponents() {
    try {
        // Load Header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const headerRes = await fetch('components/header.html');
            const headerHtml = await headerRes.text();
            headerPlaceholder.innerHTML = headerHtml;
            
            // Re-initialize header scripts after it's loaded into the DOM
            initHeaderScripts();
        }

        // Load Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerRes = await fetch('components/footer.html');
            const footerHtml = await footerRes.text();
            footerPlaceholder.innerHTML = footerHtml;
        }

        // Initialize Authentication UI (From auth.js)
        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }

    } catch (error) {
        console.error("Error loading components:", error);
    }
}
// Function to attach event listeners to header elements
function initHeaderScripts() {
    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.getElementById("closeBtn");

    if (menuBtn && mobileMenu && closeBtn) {
        menuBtn.addEventListener("click", () => mobileMenu.classList.add("active"));
        closeBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));
    }

    // Top Bar Date & Time
    function updateDateTime() {
        const dateTimeEl = document.getElementById("dateTime");
        if (dateTimeEl) {
            const now = new Date();
            dateTimeEl.innerText = now.toDateString() + " | " + now.toLocaleTimeString();
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Mobile Logout link event
    const mobileLogout = document.getElementById('logout-link-mobile');
    if (mobileLogout && typeof logoutUser === 'function') {
        mobileLogout.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            updateAuthUI();
            window.location.href = 'index.html';
        });
    }

    // Desktop Search Form Handle
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
}

document.addEventListener('DOMContentLoaded', loadComponents);