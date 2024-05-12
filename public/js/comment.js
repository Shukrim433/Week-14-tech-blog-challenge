const sendCommentBtnHandler = async (event) => {

    const body = document.querySelector('#comment').value.trim()
    const post_id = event.target.getAttribute('data-id')

    if(body && post_id) {
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({post_id, body}),
            headers: { 'Content-Type': 'application/json' },
        })

        if(response.ok) {
            document.location.replace(`/post/${post_id}`)
        } else {
            alert(response.statusText);
        }
    }
    
    
}

document.querySelector('.sendCommentBtn').addEventListener('click', sendCommentBtnHandler)