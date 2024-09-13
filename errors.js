// Function to display error messages
function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.innerText = message; // Set the error message text
    errorMessageDiv.style.display = 'block'; // Show the error message
    setTimeout(() => {
        errorMessageDiv.style.display = 'none'; // Hide after 3 seconds
    }, 3000); // Adjust time as needed
}

