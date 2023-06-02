const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = parseInt(window.location.pathname.split('/').pop());
    const content = document.querySelector('#new-content-comment').value.trim();

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text: content, post_id}),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Comment was not able to be posted');
        }
    }
};

const commentForm = document.querySelectorAll('.new-comment-form');
  commentForm.forEach((button) => {
    button.addEventListener('click', commentFormHandler);
  });