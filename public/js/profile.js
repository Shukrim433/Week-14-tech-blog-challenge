// event listener on new post button to change the display of the create post form to flex
const showCreatePostForm = () => {
    const createPostForm = document.querySelector('#createPostForm')
    createPostForm.style.display = 'block'
}

document.querySelector('#newPostBtn').addEventListener('click', showCreatePostForm)

// event listener on create button to send a post request to /api/post/ to create a post, hide the form and refresh to see updated 'your posts section'
const createNewPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector('#post-title').value.trim()
    const body = document.querySelector('#post-body').value.trim()

    if(title && body) {
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({title, body}),
            headers: { 'Content-Type': 'application/json' },
        })

        if(response.ok) {
            const createPostForm = document.querySelector('#createPostForm')
            createPostForm.style.display = 'none'
            document.location.replace('/profile')
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('#createPostForm').addEventListener('submit', createNewPost)

// event listener on delete button on post to delete post based on data-id
const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')
        const response = await fetch(`/api/post/delete/${id}`, {
            method: 'DELETE',
        })

        if(response.ok) {
            document.location.replace('/profile')
        } else {
            alert('Failed to delete post');
        }

    }
}

document.querySelector('.yourPosts').addEventListener('click', deleteButtonHandler);


// event listener on update button on post to show updateform populated with post info using data-role-id [populated with post data -get request to /update-post-form/:id to get individual post info to populate update form]
const showUpdatePostForm = async (event) => {

    const id = event.target.getAttribute('data-role-id')
    try{
        const response = await fetch(`/update-post-form/${id}`)
        const data = await response.json()

        
        document.querySelector('#post-title-update').value = data.title
        document.querySelector('#post-body-update').value = data.body

        const updateForm = document.querySelector('#updatePostForm')
        updateForm.style.display = 'block'

        // event listener on update post button to create a put request to /api/post/update/:id
        const updatePostBtnHandler = async (event) => {
            event.preventDefault()

            const title = document.querySelector('#post-title-update').value.trim()
            const body = document.querySelector('#post-body-update').value.trim()

            if(body && title) {
                const response = await fetch(`/api/post/update/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({body, title}),
                    headers: { 'Content-Type': 'application/json' },
                })
                if(response.ok) {
                    const updateForm = document.querySelector('#updatePostForm')
                    updateForm.style.display = 'none'
                    document.location.replace('/profile')
                }

            }
        }
        document.querySelector('#updatePostForm').addEventListener('submit', updatePostBtnHandler)

        
    } catch (err) {
        console.log({err})
    }
}

document.querySelectorAll('.updateBtn').forEach((button) => {
    button.addEventListener('click', showUpdatePostForm);
}) 



