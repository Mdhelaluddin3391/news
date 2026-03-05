// Optional: simple client-side form handling (prevents actual submission for now)
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. (This is a demo – no actual email sent.)');
            this.reset();
        });