const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('.tab__item');

const depositButton = document.querySelector('#dashmain .box:nth-child(2) button');
const withdrawButton = document.querySelector('#dashmain .box:nth-child(3) button');
const transferButton = document.querySelector('#dashmain .box:nth-child(4) button');
const notification = document.querySelector('.notification-toast');

// Function to update active tab and tab content
function updateActiveTab(tabId) {
    tabContents.forEach((tabContent) => {
        tabContent.classList.remove('active');
    });

    tabs.forEach((tab) => {
        tab.classList.remove('active');
    });

    const targetTab = document.querySelector(`[data-target="#${tabId}"]`);
    const targetContent = document.getElementById(tabId);

    targetTab.classList.add('active');
    targetContent.classList.add('active');
}

// Event listeners for buttons
depositButton.addEventListener('click', () => {
    updateActiveTab('deposit-content');
});

withdrawButton.addEventListener('click', () => {
    updateActiveTab('withdraw-content');
});

transferButton.addEventListener('click', () => {
    updateActiveTab('transfer-content');
});

// Event listener for tabs
tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        updateActiveTab(target.id);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const depositButton = document.getElementById("depositButton");
    const withdrawButton = document.querySelector("#withdraw-content button");
    const transferButton = document.getElementById("transferButton");

    // Use querySelectorAll to get all elements with class "balance"
    const balanceElements = document.querySelectorAll(".balance");

    const user = document.getElementById("user");
    const showBalanceButton = document.getElementById("showBalanceButton");

    // Retrieve values from localStorage
    var storedPin = localStorage.getItem('pin');
    var storedUsername = localStorage.getItem('username');
    var storedBalance = parseFloat(localStorage.getItem('balance')) || 0;

    // Update user and balance display
    user.textContent = storedUsername;
    balanceElements.forEach((element) => {
        element.setAttribute("data-amount", storedBalance);
    });
    updateBalanceDisplay();

    // Add event listeners to buttons
    depositButton.addEventListener('click', function (e) {
        e.preventDefault();
        deposit();
    });

    withdrawButton.addEventListener('click', function (e) {
        e.preventDefault();
        withdraw(storedPin);
    });

    transferButton.addEventListener('click', function (e) {
        e.preventDefault();
        transfer(storedPin);
    });

    showBalanceButton.addEventListener('click', function () {
        showBalance(storedPin);
    });

    function deposit() {
        const amountInput = document.getElementById("depositInput");
        const amount = parseFloat(amountInput.value);

        if (!isNaN(amount)) {
            balanceElements.forEach((balanceElement) => {
                let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
                balance += amount;
                balanceElement.setAttribute("data-amount", balance);
                updateBalanceDisplay();
                // Update localStorage
                localStorage.setItem('balance', balance);
                message = `Successfully Deposited ₦${amount} `;
                successMessage(message);
            });
        } else {
            const error = "Invalid Amount"
            errorMessage(error)
        }

        amountInput.value = "";


    }

    function withdraw(pin) {
        const amountInput = document.getElementById("withdrawInput");
        const amount = parseFloat(amountInput.value);
        const pinInput = document.getElementById("pinInput");

        if (!isNaN(amount)) {
            const balanceElement = balanceElements[0]; // Use the first balance element

            let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
            const enteredPin = parseFloat(pinInput.value);

            if (enteredPin === parseInt(pin)) {
                if (balance >= amount) {
                    balance -= amount;
                    // Update localStorage
                    localStorage.setItem('balance', balance);
                    const message = ` Succesfully withdrawn ₦${amount}`
                    successMessage(message)
                } else {
                    const error = "Insufficient funds!"
                    errorMessage(error)
                    return;
                }
            } else if (enteredPin > 0 && enteredPin !== pin) {
                const message = "Incorrect pin";
                errorMessage(message);
                return;
            } else {
                const message = "Input your pin";
                errorMessage(message);
                return;
            }

            balanceElement.setAttribute("data-amount", balance);
            updateBalanceDisplay();
        } else {
            const message = "Invalid amount!";
            errorMessage(message);
        }

        amountInput.value = "";
        pinInput.value = "";
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
            const error = `Account name, account number, and bank must be at least 3 characters long.`
            errorMessage(error)
            return;
        }

        if (!isNaN(amount)) {
            const balanceElement = balanceElements[0]; // Use the first balance element

            let balance = parseFloat(balanceElement.getAttribute("data-amount") || 0);
            const enteredPin = parseFloat(pinInput.value);

            if (enteredPin === parseInt(pin)) {
                if (balance >= amount) {
                    balance -= amount;
                    // Update localStorage
                    localStorage.setItem('balance', balance);
                    const message = `You have successfully transferred ₦${amount} to ${accountName}'s bank`
                    successMessage(message);
                } else {
                    const error = `Insufficient funds!`
                    errorMessage(error)
                    return;
                }
            } else if (enteredPin > 0 && enteredPin !== pin) {
                const error = `Incorrect pin`
                errorMessage(error)
                return;
            } else {
                const error = `Input your pin`
                errorMessage(error)
                return;
            }

            balanceElement.setAttribute("data-amount", balance);
            updateBalanceDisplay();
        } else {
            const error = `Invalid amount!`
            errorMessage(error)
            return;
        }

        amountInput.value = "";
        pinInput.value = "";
        accountNameElement.value = "";
        accountNumElement.value = "";
        bankElement.value = "";
    }

    function showBalance(pin) {
        const modal = document.getElementById("pinModal");
        const pinInput = document.getElementById("pinModalInput");
        const pinModalSubmit = document.getElementById("pinModalSubmit");

        const balanceElement = balanceElements[0]; // Use the first balance element

        if (balanceElement.classList.contains("hide")) {
            modal.style.display = "flex";
            pinInput.focus();
            pinModalSubmit.addEventListener("click", function () {
                const enteredPin = pinInput.value;
                if (enteredPin == parseInt(pin)) {
                    modal.style.display = "none";
                    balanceElement.classList.toggle("hide");
                    updateBalanceDisplay();
                    pinInput.value = "";
                    const message = "Balance Shown Succesfully"
                    successMessage(message)
                    return
                } else if (enteredPin != parseInt(pin)) {
                    error = "Invalid Pin";
                    errorMessage(error)
                    pinInput.value = "";
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
        const balance = parseFloat(balanceElements[0].getAttribute("data-amount") || 0);
        balanceElements.forEach((element) => {
            if (!element.classList.contains("hide")) {
                element.textContent = `₦${balance.toFixed(2)}`;
                showBalanceButton.textContent = "Hide Balance";
            } else {
                element.textContent = "*******";
                showBalanceButton.textContent = "Show Balance";
            }
        });
        showBalanceButton.textContent = balanceElements[0].classList.contains("hide") ? "Show Balance" : "Hide Balance";
    }

});

const errorMessage = (error) => {
    notification.classList.add("active")
    notification.innerHTML =
        `
        <div class="toast-banner">
            <img src="../img/errorImage.png" alt="Error">
        </div>
        <div class="toast-detail">
            <p class="toast-title">
                ${error}
            </p>
        </div>
    `
    setTimeout(() => {
        notification.classList.remove("active")
    }, 3000);
}

const successMessage = (message) => {
    notification.classList.add("active")
    notification.innerHTML =
        `
        <div class="toast-banner">
            <img src="../img/successImage.jpg" alt="Error">
        </div>
        <div class="toast-detail">
            <p class="toast-title">
                ${message}
            </p>
        </div>
    `
    setTimeout(() => {
        notification.classList.remove("active")
    }, 3000);
}