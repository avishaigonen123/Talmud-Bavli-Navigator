// ----------------------------------------------------
// Parshanim tanach case
// ----------------------------------------------------
function tanach_parshanim_func(parts, book, bookInfo) {
    let parshan = parts.shift();

    // the parshan can be more than one word
    while(parts.length > 2){
        parshan += " " + parts.shift(); 
    }

    // Check if it can be a prefix and save the matching key
    matchingKey = Object.keys(tanach_parshanim).find(key => key.startsWith(parshan));
    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    parshan = tanach_parshanim[matchingKey];
    
    parts.reverse();
    pasukInHebrew = parts[0].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    perekInHebrew = parts[1].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    
    const bookInEnglish = bookInfo[1][1];
    const prakimList = bookInfo[1][0];

    // Convert Hebrew numerals to integer for perek
    const perek = hebrewToNumber(perekInHebrew);
    if (isNaN(perek) || perek > prakimList.length ) {  // 
        showError(`פרק לא תקני, הפרק המקסימלי ב${book} הוא פרק ${numberToHebrewString(prakimList.length)}`);
        return;
    }
    
    // Convert Hebrew numerals to integer for pasuk
    const pasuk = hebrewToNumber(pasukInHebrew);
    if (isNaN(perek) || pasuk > prakimList[perek-1] ) {  // 
        showError(`הפסוק המקסימלי ב${book} פרק ${perekInHebrew} הוא פסוק ${numberToHebrewString(prakimList[perek-1])}`);
        return;
    }

    const url = `https://mg.alhatorah.org/Dual/${parshan}/${bookInEnglish}/${perek}.${pasuk}`
    chrome.tabs.create({ url: url });
    return;
}
