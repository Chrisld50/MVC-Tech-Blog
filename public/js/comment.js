async function commentFormHandler(event) {
    event.preventDefault();

    let comment_content = document.querySelector('tesxtarea[name="comment-body"]').value;

    let post_id = window.location.toString().split('/');
    
    if (comment_content) {
        let response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler)