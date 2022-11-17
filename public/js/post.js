async function newFormHandler(event) {
    event.preventDefault();
    console.log('booyahh')
    const title = document.querySelector('input[id="post-title"]').value;
    const post_content = document.querySelector('input[id="post-content"]').value;

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content


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


const sendButton = document.querySelector('#send');
if (sendButton) {sendButton.addEventListener('click', newFormHandler)};