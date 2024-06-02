// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get reference to the search bar input
    var searchBar = document.getElementById("searchBar");

    // Add event listener for keyup event on the search bar
    searchBar.addEventListener("keyup", function() {
        // Get the value typed in the search bar and convert it to lowercase for case-insensitive search
        var searchText = searchBar.value.toLowerCase();
        
        // Get all product elements
        var products = document.querySelectorAll(".product");

        // Loop through each product
        products.forEach(function(product) {
            // Get the product name from the data-name attribute and convert it to lowercase
            var productName = product.getAttribute("data-name").toLowerCase();
            
            // Check if the product name contains the search text
            if (productName.includes(searchText)) {
                // If the product matches the search, display it
                product.style.display = "block";
            } else {
                // If the product doesn't match the search, hide it
                product.style.display = "none";
            }
        });
    });
});

// Get references to form elements
const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phonenumber');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('confirmpassword');

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

// Function to set an error message and styling for input elements
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

// Function to set success styling for input elements
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Function to validate email format
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

// Function to validate input fields
const validateInputs = () => {
    let flag = 1; // Initialize flag

    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const phonenumberValue = phone.value.trim();
    const passwordValue = password.value.trim();
    const confirmpasswordValue = confirmpassword.value.trim();

    // Validation for Full Name
    if (fullnameValue === '') {
        setError(fullname, 'Please enter your name');
        flag = 0;
    } else if (fullnameValue.length < 5) {
        setError(fullname, 'Name must be at least 5 characters.');
        flag = 0;
    } else {
        setSuccess(fullname);
    }

    // Validation for Email
    if (emailValue === '') {
        setError(email, 'Please enter your email');
        flag = 0;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Invalid email address');
        flag = 0;
    } else {
        setSuccess(email);
    }

    // Validation for Phone Number (only show if it's empty)
    if (phonenumberValue === '') {
        setError(phone, 'Please enter your phone number');
        flag = 0;
    }

    // Validation for Password
    if (passwordValue === '') {
        setError(password, 'Please enter a password');
        flag = 0;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        flag = 0;
    } else {
        setSuccess(password);
    }

    // Validation for Confirm Password
    if (confirmpasswordValue === '') {
        setError(confirmpassword, 'Please confirm your password');
        flag = 0;
    } else if (confirmpasswordValue !== passwordValue) {
        setError(confirmpassword, "Passwords don't match");
        flag = 0;
    } else {
        setSuccess(confirmpassword);
    }

    // If flag is still 1, form is valid
    if (flag === 1) {
        alert("Form submitted successfully.");
        form.reset();
    }
};

// Event Listeners for real-time Validation
fullname.addEventListener("change", validateInputs);
email.addEventListener("change", validateInputs);
phone.addEventListener("change", validateInputs);
password.addEventListener("change", validateInputs);
confirmpassword.addEventListener("change", validateInputs);
