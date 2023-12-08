document.addEventListener('DOMContentLoaded', () =>  {
    var pin;
    var username;

    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        username = document.getElementById("username").value;
        pin = document.getElementById("pin").value;

        handleSignupData(pin, username);
    });

    function handleSignupData(pin, username) {
        console.log("PIN:", pin);
        console.log("Username:", username);

        localStorage.setItem('pin', pin);
        localStorage.setItem('username', username);

        window.location.href = '../pages/index.html';
    }
});