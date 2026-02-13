// Simple Show/Hide Password Function for Login Page
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

// Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        // Simple validation
        if (username === '' || password === '') {
            alert('Please enter both username and password');
            return;
        }
        
        // Simple login simulation
        alert('Login successful! Welcome back!');
        
        // In real application, you would submit the form to server
        // loginForm.submit();
    });
});