document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        const result = loginUser(email, password);
        if (result.success) {
            // Redirect to homepage or previous page
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    });
});


