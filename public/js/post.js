const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Post Creation Failed')
        }
    }
};

const postId = window.location.toString().split('/')
[
    window.location.toString().split('/').length - 1
];

const updatePostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title-update').value.trim();
    const content = document.querySelector('#post-content-update').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Post Update Failed')
        }
    }
};

// const deletePostFormHandler = async (event) => {
//     event.preventDefault();

//     const response = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert('Post Delete Failed');
//     }
// };

// const deletePost = async (postId) => {
//     const response = await fetch(`/api/posts/${postId}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//         document.location.reload();
//     } else {
//         alert('Post Delete Failed');
//     }
// };

// const deletePostHandler = (event) => {
//     if (event.target.matches('.delete-post')) {
//         const postId = event.target.getAttribute('data-post-id');
//         deletePost(postId);
//     }
// };

//BEGIN TEST!!!!!
const deletePostHandler = async (event) => {
    event.preventDefault();
  
    // Get the blog post ID
    const postId = event.target.dataset.postId;
  
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Reload the page to reflect the updated blog post list
        document.location.reload();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      console.log(err);
      alert('An error occurred');
    }
  };

// const newPostForm = document.querySelector('#new-post-form');
// if (newPostForm) {
//     newPostForm.addEventListener('submit', newPostFormHandler);
// };

// document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);

const updatePostButton = document.querySelector('#update-post');
if (updatePostButton) {
    updatePostButton.addEventListener('click', updatePostFormHandler);
}

// const deletePostButton = document.querySelector('#delete-post');
// if (deletePostButton) {
//     deletePostButton.addEventListener('click', deletePostFormHandler);
// }

const deleteButtons = document.querySelectorAll('.delete-post-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deletePostHandler);
  });
  

// document.addEventListener('click', deletePostHandler);