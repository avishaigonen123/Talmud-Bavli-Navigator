// ----------------------------------------------------
// help window logic
// ----------------------------------------------------

let helpWindow;

// Show the floating window when hovering over the button
function openHelpWindow(items) { 

    const popupContent = `
        <html dir="rtl">
        <head>
            <title>הסבר</title>
            <style>
               @font-face {
                    font-family: 'GveretLevin';
                    src: url('fonts/GveretLevinAlefAlefAlef-Regular.woff2') format('woff2'),
                        url('fonts/GveretLevinAlefAlefAlef-Regular.woff.') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
                body { 
                    font-family: 'GveretLevin', Arial, sans-serif; 
                    background-color: #f0f4f8; 
                    display: flex; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100%; 
                    margin: 0; 
                    color: #333; 
                    direction: rtl; 
                    position: relative;
                }

                help-window {
                    position: fixed;
                    left: 65px;
                    bottom: 20px;
                    width: 270px;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    display: none;
                    font-size: 14px;
                    text-align: right;
                    direction: rtl;
                }

                h3 {
                    margin-top: -10;
                    margin-bottom: -10;
                    margin-right: 10px;
                    font-size: 16px;
                }

                p {
                    margin-bottom: 20px;
                    margin-right: 5px;
                }

                h1 { 
                    margin-top: -70;
                    margin-bottom: 20px; 
                    font-size: 2em; 
                    color: #9A97E2; 
                    margin-right: 10px; /* Added margin to move title to the right */
                }
            </style>
            </head>
        <body>
            <div class="container">
                <div class="help-container">
                    <div class="help-window" id="helpWindow">
                        <h1> &#x2022; כיצד לבצע שאילתא - דוגמאות:</h1>
                        
                        <p> &#x2022; באופן כללי, ניתן להשתמש בכפתורים בשביל לראות איך להכניס כל פרשן וחלק. להלן דוגמאות לשאילתות:</p>
                        
                        <h3> &#x2022; תנ"ך: </h3>
                        <ul>
                        <li>בראשית כה א</li>
                        <li>בראשית רשי כה א</li>
                        </ul>
                        
                        <h3> &#x2022; משנה:</h3>
                        <ul>
                            <li>משנה מעשר שני ג א</li>
                            <li>משנה מעשר שני מאירי ג א</li>
                        </ul>
                        
                        <h3> &#x2022; תלמוד בבלי:</h3>
                        <ul>
                            <li>גיטין פו:</li>
                            <li>גיטין רשי פו:</li>
                            <li>גיטין פו: צורת הדף</li>
                        </ul>
                    
                        <h3> &#x2022; תלמוד ירושלמי:</h3>
                        <ul>
                            <li>ירושלמי פאה א ה</li>
                            <li>ירושלמי פאה פני יהושע א ה</li>
                        </ul>
                    
                        <h3> &#x2022; תוספתא:</h3>
                        <ul>
                            <li>תוספתא פאה א ה</li>
                            <li>תוספתא פאה פירוש קצר א ה</li>
                        </ul>
                    
                        <h3> &#x2022; רי"ף:</h3>
                        <ul>
                            <li>ריף גיטין כב:</li>
                            <li>ריף גיטין רן כב:</li>
                        </ul>

                        <h3> &#x2022; רמב"ם:</h3>
                        <ul>
                            <li>רמבם גירושין ב ב</li>
                            <li>רמבם גירושין כסף משנה ב  ב</li>
                        </ul> 

                        <h3> &#x2022; שו"ע:</h3>
                        <ul>
                            <li>שוע אורח חיים קמג א</li>
                            <li>שוע אורח חיים משנה ברורה קמג א</li>
                        </ul>
                        <h3> &#x2022; טור:</h3>
                        <ul>
                            <li>טור אורח חיים קמג א</li>
                            <li>טור אורח חיים בית יוסף קמג א</li>
                        </ul>

                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    // Get the current window's position
    if(window.screenX > 600){
        // Open a new window with specific position
        helpWindow = window.open('', '_blank', `width=${window.outerWidth},height=${window.outerHeight+190},left=${window.screenX-window.outerWidth},top=${window.screenY},resizable=yes,scrollbars=yes`);
    }
    else{
        // Open a new window with specific position
        helpWindow = window.open('', '_blank', `width=${window.outerWidth},height=${window.outerHeight+190},left=${window.screenX+window.outerWidth},top=${window.screenY},resizable=yes,scrollbars=yes`);
    }

    // Write the content to the new window
    helpWindow.document.write(popupContent);
    helpWindow.document.close(); // Close the document to finish loading
}

// Close the help window
function closeHelpWindow() {
    if(helpWindow) {
        helpWindow.close();
        helpWindow = null;
    }
}
