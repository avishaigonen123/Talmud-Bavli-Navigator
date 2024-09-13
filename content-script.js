// content-script.js

// Log to confirm the script has run
console.log("Content script is running...");

// Wait for the page to load
window.onload = function() {
    console.log("Page loaded, checking for button...");

    // Try to find the button
    const button = document.getElementById('cmdMaleh');

    if (button) {
        console.log("Button found, clicking...");
        button.click();
        console.log("Full screen button clicked.");
    } else {
        console.log("Button not found, retrying...");

        // Retry finding the button every 500 milliseconds for 5 seconds
        const interval = setInterval(() => {
            const retryButton = document.getElementById('cmdMaleh');
            if (retryButton) {
                retryButton.click();
                console.log("Successfully clicked the Full Screen button.");
                clearInterval(interval);
            } else {
                console.log("Button still not found, checking again...");
            }
        }, 500);

        // Stop checking after 5 seconds
        setTimeout(() => {
            clearInterval(interval);
            console.log("Stopped checking for the button.");
        }, 5000);
    }
};
    