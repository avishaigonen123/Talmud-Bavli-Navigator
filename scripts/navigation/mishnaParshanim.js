// ----------------------------------------------------
// Parshanim Mishna case
// ----------------------------------------------------
function mishna_parshanim_func(parts, masechet) {
    let parshan = parts.shift();

    // the parshan can be more than one word
    while(parts.length > 2){
        parshan += " " + parts.shift(); 
    }

    let perekInHebrew = parts.shift();
    let halachaInHebrew = parts.shift();
    
    
    // Check if it can be a prefix and save the matching key
    matchingKey = Object.keys(mishna_parshanim).find(key => key.startsWith(parshan));
    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    parshan = mishna_parshanim[matchingKey];


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

    const url = `https://mishna.alhatorah.org/Dual/${parshan}/${masechet}/${perek}.${halacha}}#e0n6`
    chrome.tabs.create({ url: url });
    return;
}
