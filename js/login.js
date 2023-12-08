document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const pin = document.getElementById("pin").value;

        handleLoginData(pin, username);
    });

    function handleLoginData(pin, username) {
        const storedPin = localStorage.getItem('pin');
        const storedUsername = localStorage.getItem('username');

        if (pin === storedPin && username === storedUsername) {
            // Redirect to index.html if username and pin match
            window.location.href = '../pages/main.html';
        } else {
            // Display an alert if the user does not exist
            alert("User does not exist");
        }
    }
});
