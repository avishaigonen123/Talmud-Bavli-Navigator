// ----------------------------------------------------
// loading the data from the json files
// ----------------------------------------------------

let parshanim = {};
let masechtot = [];
let masechtot_yerushalmi = [];
let halakim = {};

// Load parshanim.json, masechtot.json, etc.
async function loadParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/parshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

async function loadHalakim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/halakim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        halakim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

async function loadMasechtot() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/masechtot.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

async function loadMasechtotYerushalmi() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/masechtot_yerushalmi.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        masechtot_yerushalmi = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

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
    popupWindow = window.open('', '_blank', `width=400,height=330,left=1050,top=800`);

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

// ----------------------------------------------------
// help button logic + Go button and enter key handling
// ----------------------------------------------------

// Help button functionality
const helpBtn = document.getElementById('helpBtn');
const helpWindow = document.getElementById('helpWindow');

helpBtn.addEventListener('mouseenter', () => {
    helpWindow.style.display = 'block';
});

helpBtn.addEventListener('mouseleave', () => {
    helpWindow.style.display = 'none';
});

// Handle click on "Go" button
document.getElementById('navigate').addEventListener('click', navigateToPage);

// Handle "Enter" key press inside the input field
document.getElementById('query').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        navigateToPage();
    }
});

// ----------------------------------------------------
// Function to display error messages
// ----------------------------------------------------

function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.innerText = message; // Set the error message text
    errorMessageDiv.style.display = 'block'; // Show the error message
    setTimeout(() => {
        errorMessageDiv.style.display = 'none'; // Hide after 3 seconds
    }, 3000); // Adjust time as needed
}

// ----------------------------------------------------
// Initialize the popup windows for each button + load data
// ----------------------------------------------------

async function init() {
    await loadParshanim();
    await loadMasechtot();
    await loadHalakim();
    await loadMasechtotYerushalmi();
    
    // Populate the popups with the relevant lists
    const parshanimKeys = Object.keys(parshanim);
    setupPopupButton('parshanimBtn', parshanimKeys, 'רשימת פרשנים');

    const masechtotNames = masechtot.map(item => item[0]);
    setupPopupButton('masechtotBtn', masechtotNames, 'רשימת מסכתות בבלי');

    const halakimKeys = Object.keys(halakim);
    setupPopupButton('halakimBtn', halakimKeys, 'רשימת חלקים ברמב"ם');

    const masechtotYerushalmiNames = masechtot_yerushalmi.map(item => item[0]);
    setupPopupButton('masechtotYerushalmiBtn', masechtotYerushalmiNames, 'רשימת מסכתות ירושלמי');
    
    console.log('Popup windows are ready.');
}

// Call init to initialize and populate popup windows
init();

// ----------------------------------------------------
// hebrew to english logic + calc pages in Talmud Bavli
// ----------------------------------------------------

// Hebrew numeral to integer mapping
const hebrewNumerals = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
    'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
};


// Function to convert Hebrew numeral string to integer
function hebrewToNumber(hebrewStr) {
    let total = 0;
    for (const char of hebrewStr) {
        if (hebrewNumerals[char]) {
            total += hebrewNumerals[char];
        } else {
            return NaN;  // Return NaN if invalid character found
        }
    }
    return total;
}

// Reverse mapping of hebrewNumerals
const numberToHebrew = Object.entries(hebrewNumerals).reduce((acc, [hebrew, number]) => {
    acc[number] = hebrew;
    return acc;
}, {});

// Function to convert integer to Hebrew numeral string
function numberToHebrewString(number) {
    if (number <= 0 || !Number.isInteger(number)) {
        return "Invalid input";
    }

    let result = '';
    const thousands = Math.floor(number / 1000);
    if (thousands > 0) {
        result += numberToHebrew[thousands] + 'ת';
        number %= 1000;
    }

    const hundreds = Math.floor(number / 100);
    if (hundreds > 0) {
        result += numberToHebrew[hundreds] + 'ש';
        number %= 100;
    }

    const tens = Math.floor(number / 10);
    if (tens > 0) {
        result += numberToHebrew[tens * 10];
        number %= 10;
    }

    if (number > 0) {
        result += numberToHebrew[number];
    }

    return result;
}

// Function to convert Masechet, Daf, and Amud to a global page number
function calculateGlobalPage(masechet, daf, amud) {
    let totalPages = 0;
    let found = false;
    for (let [maschet_name, [pages, _]] of masechtot){
        if (maschet_name === masechet) {
            found = true;
            totalPages += (daf - 2) * 2;  // First page is daf 2a
            totalPages += amud === 'a' ? 1 : 2;
            break;
        } else {
            totalPages += pages * 2 - 1;  // Each daf has two amudim
        }
        }

    if (!found) {
        return "המסכת הנ\" לא קיימת בתלמוד הבבלי";
    }

    return totalPages;
}

// ----------------------------------------------------
// Navigation logic for Talmud, Yerushalmi, Rambam, Parshanim
// ----------------------------------------------------

function navigateToPage() {
    const query = document.getElementById('query').value.trim();

    // Parsing the user input (e.g., "גיטין לג")
    const parts = query.split(" ");
    if (parts.length == 1 || parts.length > 7) {
        showError("הכנס שאילתא חוקית");
        return;
    }
    // case gmara bavli
    // example: גיטין פב
    if (parts.length == 2 || (parts.length == 3 && (parts[0] == "מועד" || parts[0] == "ראש" || parts[0] == "מועד" || parts[0] == "בבא" || parts[0] == "עבודה")) || (parts[parts.length - 1] == "התורה" && parts[parts.length-2] == "על")) 
        gmara_bavli(parts);
        
    // case yerushalmi or rambam
    // example: ירושלמי גיטין א א
    // example: רמבם אישות א א
    // example: תוספתא גיטין א א
    else if(parts[0] == "ירושלמי" || parts[0] == "רמבם" || parts[0] == "תוספתא")
        yerushalmi(parts);

    // case parshanim
    // example: גיטין רשבא פב
    else        
        parshanim_func(parts);
    
}



// ----------------------------------------------------
// gmara bavli case
// ----------------------------------------------------
function gmara_bavli(parts){
    let dafInHebrew;
        let masechet = parts[0];
        if (masechet == "מעשר" || masechet == "ראש" || masechet == "מועד" || masechet == "בבא" || masechet == "עבודה" ){
            masechet += " " + parts[1];
            dafInHebrew = parts[2].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        }
        else {
            dafInHebrew = parts[1].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        }
    
        // Convert Hebrew numerals to integer for daf
        let daf = hebrewToNumber(dafInHebrew);
        if (isNaN(daf) || daf < 2) {  // Daf must be at least 2
            showError("בתלמוד הבבלי הדפים מתחילים מדף ב");
            return;
        }
    
        // Find the maximum Daf for the selected Masechet
        const masechetInfo = masechtot.find(m => m[0] === masechet);
        if (!masechetInfo) {
            showError("מסכת לא נמצאה");
            return;
        }
    
        const maxDaf = masechetInfo[1][0] + 1;  // Number of Dafim in the Masechet
        if (daf > maxDaf) {
            showError(`הדף האחרון במסכת ${masechet} הוא דף ${numberToHebrewString(Math.floor(maxDaf))}`);
            return;
        }
        
        parts.reverse();
        if (parts[0] == "התורה" && parts[1] == "על"){
            let i=0;
            for (const _mass of masechtot){
                if(_mass[0] === masechet)
                    break;
                i+=1;
            }   
            masechet = masechtot[i][1][1]; // find the english word
            
            // Convert Hebrew numerals to integer for daf
            dafInHebrew = parts[2].replace(/[^א-ת]/g, '');
            daf = hebrewToNumber(dafInHebrew);
            if (isNaN(daf) || daf < 2) {  // Daf must be at least 2
                showError("בתלמוד הבבלי הדפים מתחילים מדף ב");
                return;
            }
            const amud = parts[2].endsWith(':') ? 'b' : 'a';  // Detect amud based on input

            const url = `https://shas.alhatorah.org/Full/${masechet}/${daf}${amud}`;
            chrome.tabs.create({ url: url });
            return;
    
        }
        else {
            const amud = parts[0].endsWith(':') ? 'b' : 'a';  // Detect amud based on input
        
            // Calculate the global page number
            const globalPage = calculateGlobalPage(masechet, daf, amud);
        
            if (isNaN(globalPage)) {
                showError(globalPage);  // Display error message
            } else {
                // Navigate to the corresponding page on Daf Yomi
                const url = `https://www.daf-yomi.com/Dafyomi_Page.aspx?id=${globalPage}&vt=1&fs=0`;
                chrome.tabs.create({ url: url });
            }
        }

}

// ----------------------------------------------------
// Parshanim case
// ----------------------------------------------------
function parshanim_func(parts){
    let masechet = parts[0];
    let dafInHebrew;
    let parshan;
    let amud;

    let index = 1;
    if (masechet == "מעשר" || masechet == "ראש" || masechet == "מועד" || masechet == "בבא" || masechet == "עבודה" ){
        masechet += " " + parts[index];
        index+=1;
        parshan = parts[index];
    }
    else {
        parshan = parts[index];
    }

    // the parshan can be more than one word
    while(index<parts.length-2){
        index += 1
        parshan += " " + parts[index] 
    }

    parts.reverse();
    dafInHebrew = parts[0].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    amud = parts[0].endsWith(':') ? 'b' : 'a';  // Detect amud based on input

    
    let i=0;
    for (const _mass of masechtot){
        if(_mass[0] === masechet)
            break;
        i+=1;
    }
    if(i == masechtot.length)
    {
        showError("מסכת לא נמצאה");
        return;
    }

    // check if parshan exists
    if (!parshan in Object.keys(parshanim)) {
        showError("פרשן לא נמצא");
        return;
    }
    parshan = parshanim[parshan];
    masechet = masechtot[i][1][1];

    // Convert Hebrew numerals to integer for daf
    const daf = hebrewToNumber(dafInHebrew);
    if (isNaN(daf) || daf < 2) {  // Daf must be at least 2
        showError("בתלמוד הבבלי הדפים מתחילים מדף ב");
        return;
    }

    const url = `https://shas.alhatorah.org/Dual/${parshan}/${masechet}/${daf}${amud}`;
    chrome.tabs.create({ url: url });
    return;
}

// ----------------------------------------------------
// Yerushalmi or Rambam or Tosefta case
// ----------------------------------------------------
function yerushalmi(parts){
    let masechet = parts[0];
    let perekInHebrew, halachaInHebrew;
    if (masechet ===  "ירושלמי"){
        masechet = parts[1];

        if (masechet == "מעשר" || masechet == "ראש" || masechet == "מועד" || masechet == "בבא"  || masechet == "עבודה"){
            masechet += " " + parts[2];
    
            perekInHebrew = parts[3];
            halachaInHebrew = parts[4];
        }
        else {
            perekInHebrew = parts[2];
            halachaInHebrew = parts[3];
        }
        
        // Find the maximum Daf for the selected Masechet
        const masechetInfo = masechtot_yerushalmi.find(m => m[0] === masechet);
        if (!masechetInfo) {
            showError("מסכת לא נמצאה");
            return;
        }
        let url;
        // if(parts[parts.length - 1] === "התורה" && parts[parts.length -2] === "על"){
            
            const masechetInEnglish = masechetInfo[1][1];
            const prakimList = masechetInfo[1][0];

            perekInHebrew = perekInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
            // Convert Hebrew numerals to integer for daf
            const perek = hebrewToNumber(perekInHebrew);
            if (isNaN(perek) || perek > prakimList.length ) {  // 
                showError(`פרק לא תקני, הפרק המקסימלי במסכת ${masechet} הוא פרק ${numberToHebrewString(prakimList.length)}`);
                return;
            }
            
            halachaInHebrew = halachaInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
            // Convert Hebrew numerals to integer for halacha
            const halacha = hebrewToNumber(halachaInHebrew);
            if (isNaN(perek) || halacha > prakimList[perek-1] ) {  // 
                showError(`הלכה לא תקנית, ההלכה המקסימלית במסכת ${masechet} בפרק ${perekInHebrew} היא הלכה ${numberToHebrewString(prakimList[perek-1])}`);
                return;
            }
            
            let halachot_total = halacha;
            for (let i = 0; i < perek-1; i++)
                halachot_total += prakimList[i];

            url = `https://yerushalmi.alhatorah.org/Full/${masechetInEnglish}/${halachot_total}`
        // }
        // else {
        //     url = `https://he.wikisource.org/wiki/ירושלמי_${masechet}_${perekInHebrew}_${halachaInHebrew}`;
        // }
        chrome.tabs.create({ url: url });
        return;
        
    }
    else if (masechet ===  "רמבם"){
        let helek = parts[1];
        if (helek == "שביתת" ){
            masechet += " " + parts[2];
        }
        parts.reverse();
        let perekInHebrew = parts[1];
        let halachaInHebrew = parts[0];
        
        // Check if it can be a prefix and save the matching key
        const matchingKey = Object.keys(halakim).find(key => key.startsWith(helek));

        if (!matchingKey) {
            showError("חלק לא נמצא");
            return;
        }

        helek = halakim[matchingKey];
        
        perekInHebrew = perekInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        // Convert Hebrew numerals to integer for daf
        const perek = hebrewToNumber(perekInHebrew);
        if (isNaN(perek) ) {  // 
            showError("פרק לא תקני");
            return;
        }
        
        halachaInHebrew = halachaInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        // Convert Hebrew numerals to integer for halacha
        const halacha = hebrewToNumber(halachaInHebrew);
        if (isNaN(halacha) ) {  
            showError("הלכה לא תקנית");
            return;
            } 

        const url = `https://rambam.alhatorah.org/Full/${helek}/${perek}.${halacha}}#e0n6`
        chrome.tabs.create({ url: url });
        return;
    }
    else if (masechet ===  "תוספתא"){
        masechet = parts[1];
        if (masechet == "מעשר" || masechet == "ראש" || masechet == "מועד" || masechet == "בבא" ){
            masechet += " " + parts[2];
        }
        parts.reverse();
        let perekInHebrew = parts[1];
        let halachaInHebrew = parts[0];
        
        let i=0;
        for (const _mass of masechtot){
            if(_mass[0] === masechet)
                break;
            i+=1;
        }
        if(i == masechtot.length)
        {
            showError("מסכת לא נמצאה");
            return;
        }

        masechet = masechtot[i][1][1];
        perekInHebrew = perekInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        // Convert Hebrew numerals to integer for daf
        const perek = hebrewToNumber(perekInHebrew);
        if (isNaN(perek) ) {  // 
            showError("פרק לא תקני");
            return;
        }
        
        halachaInHebrew = halachaInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
        // Convert Hebrew numerals to integer for halacha
        const halacha = hebrewToNumber(halachaInHebrew);
        if (isNaN(halacha) ) {  
            showError("הלכה לא תקנית");
            return;
        } 

        const url = `https://tosefta.alhatorah.org/Full/${masechet}/${perek}.${halacha}}#e0n6`
        chrome.tabs.create({ url: url });
        return;
    }
}

