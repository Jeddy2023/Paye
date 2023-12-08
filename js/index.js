document.addEventListener('DOMContentLoaded', function () {
    const depositButton = document.getElementById("depositButton");
    const withdrawButton = document.getElementById("withdrawButton");
    const transferButton = document.getElementById("transferButton");
    const balanceElement = document.getElementById("balance");
    const user = document.getElementById("user");
    const showBalanceButton = document.getElementById("showBalanceButton");
    const errorMessage = document.querySelector(".errormessage");

    var storedPin = localStorage.getItem('pin');
    console.log(storedPin, typeof (storedPin));
    var storedUsername = localStorage.getItem('username');
    var storedBalance = parseFloat(localStorage.getItem('balance')) || 0;

    user.textContent = storedUsername;
    balanceElement.setAttribute("data-amount", storedBalance);
    updateBalanceDisplay();

    depositButton.addEventListener('click', function () {
        deposit();
    });

    withdrawButton.addEventListener('click', function () {
        withdraw(storedPin);
    });

    transferButton.addEventListener('click', function () {
        transfer(storedPin);
    });

    showBalanceButton.addEventListener('click', function () {
        showBalance(storedPin);
    });

    function deposit() {
        const amountInput = document.getElementById("depositInput");
        const amount = parseFloat(amountInput.value);

        if (!isNaN(amount)) {
            let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
            balance += amount;
            balanceElement.setAttribute("data-amount", balance);
            updateBalanceDisplay();
            // Update localStorage
            localStorage.setItem('balance', balance);
        } else {
            alert("Invalid amount!");
        }

        amountInput.value = "";
    }

    function withdraw(pin) {
        const amountInput = document.getElementById("withdrawInput");
        const amount = parseFloat(amountInput.value);
        const pinInput = document.getElementById("pinInput");

        if (!isNaN(amount)) {
            let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
            const enteredPin = parseFloat(pinInput.value);

            if (enteredPin === parseInt(pin)) {
                if (balance >= amount) {
                    balance -= amount;
                    // Update localStorage
                    localStorage.setItem('balance', balance);
                } else {
                    errorMessage.textContent = "Insufficient funds!";
                    return;
                }
            } else if (enteredPin > 0 && enteredPin !== pin) {
                errorMessage.textContent = "Incorrect pin";
                return;
            } else {
                errorMessage.textContent = "Input your pin";
                return;
            }

            balanceElement.setAttribute("data-amount", balance);
            updateBalanceDisplay();
        } else {
            errorMessage.textContent = "Invalid amount!";
        }

        amountInput.value = "";
        pinInput.value = "";
        errorMessage.textContent = "";
    }

    function transfer(pin) {
        const amountInput = document.getElementById("transferInput");
        const pinInput = document.getElementById("pinTransferInput");
        const accountNameElement = document.getElementById("accountName");
        const accountNumElement = document.getElementById("accountNum");
        const bankElement = document.getElementById("bank");

        const amount = parseFloat(amountInput.value);

        const accountName = accountNameElement.value.trim();
        const accountNum = accountNumElement.value.trim();
        const bank = bankElement.value.trim();

        if (accountName.length < 3 || accountNum.length < 3 || bank.length < 3) {
            errorMessage.textContent = "Account name, account number, and bank must be at least 3 characters long.";
            return;
        }

        if (!isNaN(amount)) {
            let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
            const enteredPin = parseFloat(pinInput.value);

            if (enteredPin === parseInt(pin)) {
                if (balance >= amount) {
                    balance -= amount;
                    // Update localStorage
                    localStorage.setItem('balance', balance);
                    setTimeout(() => {
                        alert(`You have successfully transferred $${amount} to ${accountName}, ${bank} bank`);
                    }, 100);
                } else {
                    errorMessage.textContent = "Insufficient funds!";
                    return;
                }
            } else if (enteredPin > 0 && enteredPin !== pin) {
                errorMessage.textContent = "Incorrect pin";
                return;
            } else {
                errorMessage.textContent = "Input your pin";
                return;
            }

            balanceElement.setAttribute("data-amount", balance);
            updateBalanceDisplay();
        } else {
            errorMessage.textContent = "Invalid amount!";
        }

        amountInput.value = "";
        pinInput.value = "";
        errorMessage.textContent = "";
    }

    function showBalance(pin) {
        const modal = document.getElementById("pinModal");
        const pinInput = document.getElementById("pinModalInput");
        const pinModalSubmit = document.getElementById("pinModalSubmit");

        if (balanceElement.classList.contains("hide")) {
            modal.style.display = "flex";
            pinModalSubmit.addEventListener("click", function () {
                const enteredPin = pinInput.value;
                if (enteredPin == parseInt(pin)) {
                    modal.style.display = "none";
                    balanceElement.classList.toggle("hide");
                    updateBalanceDisplay();
                    pinInput.value = "";
                } else if (enteredPin != parseInt(pin)) {
                    modal.style.display = "none";
                    errorMessage.textContent = "Invalid Pin";
                } else {
                    modal.style.display = "none";
                }
            });
        } else {
            balanceElement.classList.toggle("hide");
            updateBalanceDisplay();
        }

        errorMessage.textContent = "";
    }

    function updateBalanceDisplay() {
        const balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
        if (!balanceElement.classList.contains("hide")) {
            balanceElement.textContent = `$${balance.toFixed(2)}`;
            showBalanceButton.textContent = "Hide Balance";
        } else {
            balanceElement.textContent = "*******";
            showBalanceButton.textContent = "Show Balance";
        }
    }
});