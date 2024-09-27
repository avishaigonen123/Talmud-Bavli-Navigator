// ----------------------------------------------------
// popup window logic
// ----------------------------------------------------

let popupWindow = null; // Store the reference to the popup window

// Show the floating window when hovering over the button
function showPopupWindow(items, title) {
    const popupContent = `
        <html dir="rtl">
        <head>
            <title>${title}</title>
            <style>
                @font-face {
                    font-family: 'KeterAramTsova';
                    src: url('fonts/KeterAramTsova.woff2') format('woff2'),
                        url('fonts/KeterAramTsova.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }

                body {
                    font-family: 'KeterAramTsova', Arial, sans-serif;
                    font-size: 20px;
                    margin: 20px;
                    padding: 10px;
                    background-color: #f0f0f0;
                }
                h2 {
                    text-align: right;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    padding: 5px 0;
                    border-bottom: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <h2>${title}</h2>
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </body>
        </html>
    `;
    
    // Check if the popup window is already open
    if (popupWindow) {
        popupWindow.close();
        popupWindow = null;
    }

    // Open a new window with specific position
    popupWindow = window.open('', '_blank', `width=${window.outerWidth},height=${window.outerHeight},left=${window.screenX-window.outerWidth},top=${window.screenY},resizable=yes,scrollbars=yes`);

    // Write the content to the new window
    popupWindow.document.write(popupContent);
    popupWindow.document.close(); // Close the document to finish loading
}

// Event handler for showing the popup
function setupPopupButton(buttonId, items, title) {
    const button = document.getElementById(buttonId);

    // Open the popup when hovering over the button
    button.addEventListener('mouseenter', () => {
        showPopupWindow(items, title);
    });
    
}