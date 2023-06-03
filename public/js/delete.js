//added a delete specific js file due to errors with original post.js file throwing errors on certain pages

const deletePostHandler = async (event) => {
    event.preventDefault();

    const postId = event.target.dataset.postId;

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {

            document.location.reload();
        } else {
            alert('Failed to delete blog post');
        }
    } catch (err) {
        console.log(err);
        alert('An error occurred');
    }
};

const deleteButtons = document.querySelectorAll('.delete-post-btn');
deleteButtons.forEach((button) => {
    button.addEventListener('click', deletePostHandler);
});