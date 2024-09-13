// Table with the number of pages for each Masechet
const masechtot = [
    ['ברכות', 63],
    ['שבת', 156.5],
    ['עירובין', 104],
    ['פסחים', 120.5],
    ['שקלים', 21.5],
    ['יומא', 87],
    ['סוכה', 55.5],
    ['ביצה', 39.5],
    ['ראש השנה', 34],
    ['תענית', 30],
    ['מגילה', 31],
    ['מועד קטן', 28],
    ['חגיגה', 26],
    ['יבמות', 121.5],
    ['כתובות', 111.5],
    ['נדרים', 90.5],
    ['נזיר', 65.5],
    ['סוטה', 48.5],
    ['גיטין', 89.5],
    ['קידושין', 81.5],
    ['בבא קמא', 118.5],
    ['בבא מציעא', 118],
    ['בבא בתרא', 175.5],
    ['סנהדרין', 112.5],
    ['מכות', 23.5],
    ['שבועות', 48.5],
    ['עבודה זרה', 75.5],
    ['הוריות', 13],
    ['זבחים', 119.5],
    ['מנחות', 109],
    ['חולין', 141],
    ['בכורות', 60],
    ['ערכין', 33],
    ['תמורה', 34],
    ['כריתות', 27.5],
    ['מעילה', 20],
    ['קנים', 3],
    ['תמיד', 9.5],
    ['מדות', 4.5],
    ['נידה', 72]
];

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

    for (let [m, pages] of masechtot) {
        if (m === masechet) {
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


// Function to handle the navigation logic
function navigateToPage() {
    const query = document.getElementById('query').value.trim();

    // Parsing the user input (e.g., "גיטין לג")
    const parts = query.split(" ");
    if (parts.length !== 2 && parts.length !== 3) {
        showError("הכנס שאילתא חוקית");
        return;
    }

    let masechet = parts[0];
    let dafInHebrew;
    if (masechet == "ראש" || masechet == "מועד" || masechet == "בבא" || masechet == "עבודה" ){
        masechet += " " + parts[1];
        dafInHebrew = parts[2].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    }
    else {
        dafInHebrew = parts[1].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    }

    // Convert Hebrew numerals to integer for daf
    const daf = hebrewToNumber(dafInHebrew);
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

    const maxDaf = masechetInfo[1] + 1;  // Number of Dafim in the Masechet
    if (daf > maxDaf) {
        showError(`הדף האחרון במסכת ${masechet} הוא דף ${numberToHebrewString(Math.floor(maxDaf))}`);
        return;
    }
    
    const amud = parts[1].endsWith(':') ? 'b' : 'a';  // Detect amud based on input

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

// Handle click on "Go" button
document.getElementById('navigate').addEventListener('click', navigateToPage);

// Handle "Enter" key press inside the input field
document.getElementById('query').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        navigateToPage();
    }
});

