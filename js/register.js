// Simple Show/Hide Password Function
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const showButton = passwordInput.parentElement.querySelector('.show-password-btn');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        showButton.textContent = 'Show';
    }
}

// Password Match Validation
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('passwordMatchMessage');
    const confirmError = document.getElementById('confirmPasswordError');

    // Clear messages if both fields are empty
    if (password === '' && confirmPassword === '') {
        messageDiv.className = '';
        messageDiv.textContent = '';
        confirmError.textContent = '';
        return false;
    }

    // Check if passwords match
    if (password === confirmPassword) {
        messageDiv.className = 'match';
        messageDiv.textContent = '✓ Passwords match';
        confirmError.textContent = '';
        return true;
    } else {
        messageDiv.className = 'mismatch';
        messageDiv.textContent = '✗ Passwords do not match';
        confirmError.textContent = 'Passwords do not match';
        return false;
    }
}


// Form Validation
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    let isValid = true;

    // Validate Full Name
    const nameError = document.getElementById('nameError');
    if (fullName.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Validate Email
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validate Username
    const usernameError = document.getElementById('usernameError');
    if (username.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        usernameError.textContent = 'Username can only contain letters, numbers, and underscores';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    // Validate Drone Number
    const droneValid = validateDroneNumber();
    if (!droneValid) {
        isValid = false;
    }

    // Validate Password
    const passwordError = document.getElementById('passwordError');
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // Check Password Match
    const passwordsMatch = checkPasswordMatch();
    if (!passwordsMatch) {
        isValid = false;
    }

    // Check Terms Agreement
    if (!agreeTerms) {
        isValid = false;
    }

    // Enable/Disable Register Button
    const registerBtn = document.getElementById('registerBtn');
    registerBtn.disabled = !isValid;

    return isValid;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Real-time validation as user types
    const inputs = document.querySelectorAll('#fullName, #email, #username, #droneNumber, #password, #confirmPassword');
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Terms checkbox validation
    document.getElementById('agreeTerms').addEventListener('change', validateForm);

    // Form submission
    document.getElementById('registrationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                username: document.getElementById('username').value.trim(),
                droneNumber: document.getElementById('droneNumber').value.trim(),
                password: document.getElementById('password').value
            };

            // Simple confirmation with details
            const confirmMessage = `Create account with these details?\n\n` +
                `Name: ${formData.fullName}\n` +
                `Email: ${formData.email}\n` +
                `Username: ${formData.username}\n` +
                `Drone: ${formData.droneNumber}`;

            const confirmSubmit = confirm(confirmMessage);

            if (confirmSubmit) {
                // Show loading state
                const registerBtn = document.getElementById('registerBtn');
                const originalText = registerBtn.textContent;
                registerBtn.textContent = 'Registering Drone...';
                registerBtn.disabled = true;

                // Simulate registration process
                setTimeout(function () {
                    alert(`Registration successful!\n\nDrone ${formData.droneNumber} has been registered to your account.\nYou can now login with your credentials.`);
                    registerBtn.textContent = originalText;
                    registerBtn.disabled = false;

                    // Redirect to login page after successful registration
                    // window.location.href = 'login.html';
                }, 1500);
            }
        } else {
            alert('Please fill all fields correctly and agree to terms.');
        }
    });

    });