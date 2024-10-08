// content-script.js

// Log to confirm the script has run
console.log("Content script is running...");

// Wait for the page to load
window.onload = function() {
    // there are 2 annoying windows on al-Hatorah
    // close annoying window in Al-Hatora
    if(autoCheckCheckbox()) // trying to mark as closed, otherwise, it can't be found, therefore no need to close
        autoClickCloseButton();

    // close annoying window in Al-Hatora
    if(autoCheckCheckbox()) // trying to mark as closed, otherwise, it can't be found, therefore no need to close
        autoClickCloseButton();

    // full screen in Daf-Yomi page
    autoClickFullScreenButton();
}

function autoClickFullScreenButton() {
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

function autoClickCloseButton() {
    const buttons = document.querySelectorAll('button');
    let closeButton = null;

    buttons.forEach(button => {
        if (button.textContent.includes("Close") || button.textContent.includes("סגירה")) {
            closeButton = button;
        }
    });

    if (closeButton) {
        closeButton.addEventListener('click', handleCloseButtonClick);
        closeButton.click(); // Simulate click
        }
}

function handleCloseButtonClick() {
    const overlay = document.querySelector('.mg-popup-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function autoCheckCheckbox() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let targetCheckbox = null;
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.closest('label');
        if (label) {
            const labelText = label.textContent.trim();
            if (labelText.includes("לא להציג שוב") || labelText.includes("Don't show again")) {
                targetCheckbox = checkbox;
            }
        }
    });
    
    if (targetCheckbox && !targetCheckbox.checked) {
        targetCheckbox.checked = true; // Check the checkbox
        console.log("Closed annoying window");
        return true;
    }
}
