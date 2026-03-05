document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    const profileContent = document.getElementById('profile-content');

    if (!user) {
        // Not logged in, redirect to login
        window.location.href = 'login.html?redirect=profile.html';
        return;
    }

    // Display user info
    profileContent.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Member since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</p>
        <p><a href="index.html">Back to Home</a></p>
    `;
});

