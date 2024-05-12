//'submit' event listener on the signup form , event causes a post request to /api/user/signup

const signUpHandler = async (event) => {
    console.log('helo')
    event.preventDefault()

    const user_name = document.querySelector('#userName-signup').value.trim()
    const password_ = document.querySelector('#password-signup').value.trim()

    const newUser = {userName: user_name, password: password_}
    if (newUser) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({...newUser}),
            headers: { 'Content-Type': 'application/json' },
        })
        console.log(response);

        if(response.ok) {
            document.location.replace('/profile')
        } else {
            alert(response.statusText);
        }
    }
}



document.querySelector('.signup-form').addEventListener('submit', signUpHandler)