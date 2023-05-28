async function signup_handler(event) {
    event.preventDefault();

    const username = $('#username_form').val().trim();
    const email = $('#email_form').val().trim();
    const password = $('#password_form').val().trim();

    console.log(`username: ${username}\nemail: ${email}\npassword: ${password}`);

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ firstName: username, email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.href = '/';
        } else {
            alert(`Failed to signup`);
        }
    }

}

$('#signup_btn').click(signup_handler);