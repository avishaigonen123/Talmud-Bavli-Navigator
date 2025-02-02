// ----------------------------------------------------
// Parshanim tosefta case
// ----------------------------------------------------
function tosefta_parshanim_func(parts, helek) {
    let parshan = parts.shift();

    // the parshan can be more than one word
    while(parts.length > 2){
        parshan += " " + parts.shift(); 
    }

    let perekInHebrew = parts.shift();
    let halachaInHebrew = parts.shift();
    
    
    // Check if it can be a prefix and save the matching key
    matchingKey = Object.keys(tosefta_parshanim).find(key => key.startsWith(parshan));
    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    parshan = tosefta_parshanim[matchingKey];


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

    const url = `https://tosefta.alhatorah.org/Dual/${parshan}/${helek}/${perek}.${halacha}`
    chrome.tabs.create({ url: url });
    return;
}
