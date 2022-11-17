async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            id,
            user_id,
            title,
            post_content,
            date_created

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#send').addEventListener('submit', newFormHandler)