const RESET_PASSWORD_API = 'https://your-backend.com/api/reset-password'; // Replace

// Get token from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

document.getElementById('reset-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPass = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-password').value;
    const errorDiv = document.getElementById('reset-error');
    const successDiv = document.getElementById('reset-success');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if (newPass !== confirm) {
        errorDiv.textContent = 'Passwords do not match.';
        errorDiv.style.display = 'block';
        return;
    }
    if (newPass.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters.';
        errorDiv.style.display = 'block';
        return;
    }
    if (!token) {
        errorDiv.textContent = 'Invalid or missing reset token.';
        errorDiv.style.display = 'block';
        return;
    }

    // Simulate API call
    setTimeout(() => {
        // Mock success
        successDiv.textContent = 'Your password has been reset successfully. You can now log in with your new password.';
        successDiv.style.display = 'block';
        document.getElementById('reset-form').reset();
        // Optionally redirect to login after a few seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }, 800);
});