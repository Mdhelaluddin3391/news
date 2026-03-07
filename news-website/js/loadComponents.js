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
        menuBtn.addEventListener("click", () => mobileMenu.classList.add("active"));
        closeBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));
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