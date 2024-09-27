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

// Function to convert integer to Hebrew numeral string
function numberToHebrewString(number) {
    if (number <= 0 || !Number.isInteger(number)) {
        return "Invalid input";
    }

    let result = '';
    for (const tav of Object.keys(hebrewNumerals).reverse()) {
        while (number >= hebrewNumerals[tav]) {
            result += tav;
            number -= hebrewNumerals[tav];
        }
    }

    return result;
}

// Function to convert Masechet, Daf, and Amud to a global page number
function calculateGlobalPage(masechet, daf, amud) {
    let totalPages = 0;
    let found = false;
    for (let [maschet_name, [pages, _]] of bavli_masechtot) {
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