// js/authors.js
const AUTHORS_API_URL = `${CONFIG.API_BASE_URL}/news/authors/`;

async function fetchAndRenderAuthors() {
    const container = document.getElementById('authors-container');
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('error-message');

    loader.style.display = 'block';
    errorMsg.style.display = 'none';

    try {
        const response = await fetch(AUTHORS_API_URL);
        if (!response.ok) throw new Error('Failed to fetch authors');
        
        const data = await response.json();
        const authors = data.results || data; // Pagination handle karne ke liye

        if (authors.length === 0) {
            container.innerHTML = '<p style="color: var(--gray);">No authors found.</p>';
            return;
        }

        let html = '';
        authors.forEach(author => {
            const avatar = author.profile_picture || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80';
            const role = author.role || 'Contributor';

            // Har card par click karne se uski profile (author.html) khulegi
            html += `
                <div class="author-card" onclick="window.location.href='author.html?id=${author.id}'">
                    <img src="${avatar}" alt="${author.name}" class="author-card-avatar">
                    <h3 class="author-card-name">${author.name}</h3>
                    <p class="author-card-role">${role}</p>
                    <div class="author-card-social">
                        ${author.twitter_url ? `<a href="${author.twitter_url}" onclick="event.stopPropagation()" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                        ${author.linkedin_url ? `<a href="${author.linkedin_url}" onclick="event.stopPropagation()" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;

    } catch (error) {
        console.error('Error fetching authors:', error);
        errorMsg.textContent = 'Failed to load authors. Please try again later.';
        errorMsg.style.display = 'block';
    } finally {
        loader.style.display = 'none';
    }
}

// Page load hote hi function call karein
document.addEventListener('DOMContentLoaded', fetchAndRenderAuthors);