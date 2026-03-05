// js/edit-profile.js
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser(); // Using function from auth.js
    
    if (!user) {
        window.location.href = 'login.html?redirect=edit-profile.html';
        return;
    }

    // Populate current data
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;

    const form = document.getElementById('edit-profile-form');
    const successDiv = document.getElementById('edit-success');
    const errorDiv = document.getElementById('edit-error');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newName = document.getElementById('edit-name').value.trim();
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;

        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        if (newPassword && newPassword !== confirmNewPassword) {
            errorDiv.textContent = 'New passwords do not match.';
            errorDiv.style.display = 'block';
            return;
        }

        // Fetch all users from localStorage to update
        let allUsers = JSON.parse(localStorage.getItem('newsHub_users')) || [];
        const userIndex = allUsers.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            allUsers[userIndex].name = newName;
            if (newPassword) {
                allUsers[userIndex].password = newPassword;
            }
            localStorage.setItem('newsHub_users', JSON.stringify(allUsers));
            
            // Update current session
            user.name = newName;
            localStorage.setItem('newsHub_currentUser', JSON.stringify(user));

            successDiv.textContent = 'Profile updated successfully!';
            successDiv.style.display = 'block';
            
            // Optional: Clear password fields after save
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
        } else {
            errorDiv.textContent = 'An error occurred while saving.';
            errorDiv.style.display = 'block';
        }
    });
});