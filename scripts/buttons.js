// ----------------------------------------------------
// help button logic + Go button and enter key handling
// ----------------------------------------------------

// Help button functionality
const helpBtn = document.getElementById('helpBtn');

helpBtn.addEventListener('mouseenter', () => {
    openHelpWindow();
});

helpBtn.addEventListener('mouseleave', () => {
    closeHelpWindow();
});

// Handle click on "Go" button
document.getElementById('navigate').addEventListener('click', navigateToPage);

// Handle "Enter" key press inside the input field
document.getElementById('query').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        navigateToPage();
    }
});
