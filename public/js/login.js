//'submit' event listener on the login form , event causes a post request to /api/user/login

const loginHandler = async (event) => {
    console.log('helo')
    event.preventDefault()

    const userName = document.querySelector('#userName-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()

    if (userName && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: { 'Content-Type': 'application/json' },
        })

        if(response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText);
        }
    }
}



document.querySelector('.login-form').addEventListener('submit', loginHandler)