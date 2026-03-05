// ==================== AUTHENTICATION HELPERS ====================

const AUTH_STORAGE_KEY = 'newsHub_currentUser';
const USERS_STORAGE_KEY = 'newsHub_users';

// Initialize users storage if not exists
function initUsers() {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
}

// Get all registered users
function getUsers() {
    initUsers();
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY));
}

// Save users array
function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Register a new user
function registerUser(name, email, password) {
    const users = getUsers();
    // Check if email already exists
    const existing = users.find(u => u.email === email);
    if (existing) {
        return { success: false, message: 'Email already registered.' };
    }
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, hash the password!
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveUsers(users);
    return { success: true, user: newUser };
}

// Login user
function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        // Remove password before storing in session
        const { password, ...safeUser } = user;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
        return { success: true, user: safeUser };
    }
    return { success: false, message: 'Invalid email or password.' };
}

// Logout user
function logoutUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

// Get current logged in user (returns null if not logged in)
function getCurrentUser() {
    const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return getCurrentUser() !== null;
}

function updateAuthUI() {
    const user = getCurrentUser();
    const authLinks = document.querySelectorAll('.auth-link-item');
    authLinks.forEach(link => {
        if (user) {
            if (link.classList.contains('login-link')) link.style.display = 'none';
            if (link.classList.contains('register-link')) link.style.display = 'none';
            if (link.classList.contains('profile-link')) link.style.display = 'inline-block';
            if (link.classList.contains('saved-link')) link.style.display = 'inline-block';
            if (link.classList.contains('logout-link')) link.style.display = 'inline-block';
        } else {
            if (link.classList.contains('login-link')) link.style.display = 'inline-block';
            if (link.classList.contains('register-link')) link.style.display = 'inline-block';
            if (link.classList.contains('profile-link')) link.style.display = 'none';
            if (link.classList.contains('saved-link')) link.style.display = 'none';
            if (link.classList.contains('logout-link')) link.style.display = 'none';
        }
    });
    const userNameSpan = document.getElementById('user-name');
    if (userNameSpan) {
        userNameSpan.textContent = user ? user.name : '';
    }
}




// Attach logout handler if logout link exists
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logoutUser();
            updateAuthUI();
            window.location.href = 'index.html'; // redirect to home after logout
        });
    }
    updateAuthUI();
});










// ==================== BOOKMARKS / SAVED ARTICLES ====================

function getSavedKey() {
    const user = getCurrentUser();
    return user ? `savedArticles_${user.id}` : null;
}

// Save an article (full article object)
function saveArticle(article) {
    const key = getSavedKey();
    if (!key) return false; // not logged in
    let saved = JSON.parse(localStorage.getItem(key)) || [];
    // Check if already saved
    if (!saved.some(a => a.id === article.id)) {
        saved.push(article);
        localStorage.setItem(key, JSON.stringify(saved));
    }
    return true;
}

// Remove an article by id
function unsaveArticle(articleId) {
    const key = getSavedKey();
    if (!key) return false;
    let saved = JSON.parse(localStorage.getItem(key)) || [];
    saved = saved.filter(a => a.id !== articleId);
    localStorage.setItem(key, JSON.stringify(saved));
    return true;
}

// Check if an article is saved
function isArticleSaved(articleId) {
    const key = getSavedKey();
    if (!key) return false;
    const saved = JSON.parse(localStorage.getItem(key)) || [];
    return saved.some(a => a.id === articleId);
}

// Get all saved articles for current user
function getSavedArticles() {
    const key = getSavedKey();
    if (!key) return [];
    return JSON.parse(localStorage.getItem(key)) || [];
}