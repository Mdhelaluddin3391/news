// ==================== COMMENTS MODULE ====================
// Depends on auth.js (getCurrentUser)

const COMMENTS_API_URL = 'https://your-backend.com/api/comments'; // Replace with real endpoint

// Mock comments data (by articleId)
const mockComments = {
    'gen-1': [
        {
            id: 'c1',
            articleId: 'gen-1',
            author: { id: 'user1', name: 'John Doe' },
            text: 'Great article! Really informative.',
            createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: 'c2',
            articleId: 'gen-1',
            author: { id: 'user2', name: 'Jane Smith' },
            text: 'I disagree with some points, but well written.',
            createdAt: new Date(Date.now() - 7200000).toISOString()
        }
    ],
    'tech-1': [
        {
            id: 'c3',
            articleId: 'tech-1',
            author: { id: 'user1', name: 'John Doe' },
            text: 'Can’t wait to try these glasses!',
            createdAt: new Date().toISOString()
        }
    ]
};

// Fetch comments for an article
async function fetchComments(articleId) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockComments[articleId] || []);
        }, 500);
    });
}

// Post a new comment
async function postComment(articleId, text) {
    const user = getCurrentUser();
    if (!user) throw new Error('You must be logged in to comment.');

    // Simulate API post
    return new Promise((resolve) => {
        setTimeout(() => {
            const newComment = {
                id: 'c' + Date.now(),
                articleId,
                author: { id: user.id, name: user.name },
                text,
                createdAt: new Date().toISOString()
            };
            if (!mockComments[articleId]) mockComments[articleId] = [];
            mockComments[articleId].push(newComment);
            resolve(newComment);
        }, 500);
    });
}

// Delete a comment (only if author matches current user)
async function deleteComment(commentId, articleId) {
    const user = getCurrentUser();
    if (!user) throw new Error('You must be logged in.');

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const comments = mockComments[articleId] || [];
            const commentIndex = comments.findIndex(c => c.id === commentId);
            if (commentIndex === -1) {
                reject(new Error('Comment not found.'));
                return;
            }
            const comment = comments[commentIndex];
            if (comment.author.id !== user.id) {
                reject(new Error('You can only delete your own comments.'));
                return;
            }
            comments.splice(commentIndex, 1);
            resolve();
        }, 500);
    });
}

// Render comments list and form
async function renderComments(articleId, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const user = getCurrentUser();
    const comments = await fetchComments(articleId);

    if (comments.length === 0) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
    } else {
        let html = '';
        comments.forEach(c => {
            const isAuthor = user && c.author.id === user.id;
            html += `
                <div class="comment" data-comment-id="${c.id}">
                    <div class="comment-header">
                        <span class="comment-author">${c.author.name}</span>
                        <span class="comment-date">${new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <div class="comment-text">${c.text}</div>
                    ${isAuthor ? `
                        <div class="comment-actions">
                            <button class="delete-comment" data-comment-id="${c.id}">Delete</button>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        container.innerHTML = html;

        // Attach delete handlers
        container.querySelectorAll('.delete-comment').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const commentId = e.target.dataset.commentId;
                try {
                    await deleteComment(commentId, articleId);
                    await renderComments(articleId, containerId); // Refresh
                } catch (err) {
                    alert(err.message);
                }
            });
        });
    }

    // Render comment form or login prompt
    const formContainer = document.getElementById('comment-form-container');
    if (user) {
        formContainer.innerHTML = `
            <div class="comment-form">
                <h4>Add a Comment</h4>
                <textarea id="new-comment-text" rows="3" placeholder="Write your comment..."></textarea>
                <button id="submit-comment">Post Comment</button>
            </div>
        `;
        document.getElementById('submit-comment').addEventListener('click', async () => {
            const text = document.getElementById('new-comment-text').value.trim();
            if (!text) return;
            const btn = document.getElementById('submit-comment');
            btn.disabled = true;
            try {
                await postComment(articleId, text);
                document.getElementById('new-comment-text').value = '';
                await renderComments(articleId, containerId);
            } catch (err) {
                alert(err.message);
            } finally {
                btn.disabled = false;
            }
        });
    } else {
        formContainer.innerHTML = `
            <p class="login-prompt">
                <a href="login.html?redirect=article.html?id=${articleId}">Log in</a> to post a comment.
            </p>
        `;
    }
}