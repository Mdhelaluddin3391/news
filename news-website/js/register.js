document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const errorDiv = document.getElementById('register-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirm = document.getElementById('confirm-password').value;

        // Basic validation
        if (password !== confirm) {
            errorDiv.textContent = 'Passwords do not match.';
            errorDiv.style.display = 'block';
            return;
        }
        if (password.length < 6) {
            errorDiv.textContent = 'Password must be at least 6 characters.';
            errorDiv.style.display = 'block';
            return;
        }

        const result = registerUser(name, email, password);
        if (result.success) {
            // Auto-login after registration
            loginUser(email, password);
            window.location.href = 'index.html';
        } else {
            errorDiv.textContent = result.message;
            errorDiv.style.display = 'block';
        }
    });
});