// js/unsubscribe.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('unsubscribe-form');
    const errorDiv = document.getElementById('unsub-error');
    const successDiv = document.getElementById('unsub-success');

    // Agar URL me email pre-filled aaya ho (e.g. email link se)
    const urlParams = new URLSearchParams(window.location.search);
    const prefilledEmail = urlParams.get('email');
    if (prefilledEmail) {
        document.getElementById('email').value = prefilledEmail;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();

        // Reset messages
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        if (!email) {
            errorDiv.textContent = 'Please enter a valid email address.';
            errorDiv.style.display = 'block';
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';

        // Simulate API call to backend
        setTimeout(() => {
            // Success scenario
            form.style.display = 'none'; // Hide the form
            document.querySelector('.unsubscribe-message').style.display = 'none';
            successDiv.style.display = 'block';
            
            // Re-enable button just in case
            submitBtn.disabled = false;
            submitBtn.textContent = 'Unsubscribe Me';
        }, 1000); // 1 second delay simulate karne ke liye
    });
});