async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('tesxtarea[name="comment-body"]').value;

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length -1]
    

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

document.querySelector('#comment_info').addEventListener('submit', commentFormHandler)