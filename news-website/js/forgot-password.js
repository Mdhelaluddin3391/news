const FORGOT_PASSWORD_API = 'https://your-backend.com/api/forgot-password'; // Replace

document.getElementById('forgot-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const errorDiv = document.getElementById('forgot-error');
    const successDiv = document.getElementById('forgot-success');

    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    // Simulate API call
    // In real app: fetch(FORGOT_PASSWORD_API, { method: 'POST', body: JSON.stringify({ email }) })
    setTimeout(() => {
        // Mock success: always show success (don't reveal if email exists)
        successDiv.textContent = 'If that email is registered, we have sent a password reset link. Please check your inbox.';
        successDiv.style.display = 'block';
        document.getElementById('forgot-form').reset();
    }, 800);
});