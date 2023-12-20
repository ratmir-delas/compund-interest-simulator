// Handle form submission
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        language: document.getElementById('language').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:6969/api/v1/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(data => {
            console.log('Success:', data);
            //alert('User registered successfully!');

            // Set a cookie with user information
            setCookie('userInfo', JSON.stringify(formData), 30); // Keeps the user logged in for set days

            // Redirect to index page on successful registration
            window.location.href = './simulator.html'; // Adjust the URL as needed
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //alert('Error registering user: ' + error.message);
            // Handle errors here
        });
});
