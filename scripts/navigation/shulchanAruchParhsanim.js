// ----------------------------------------------------
// Parshanim shulchanAruch case
// ----------------------------------------------------
function shulchanAruch_parshanim_func(parts, helek) {
    let parshan = parts.shift();

    // the parshan can be more than one word
    while(parts.length > 2){
        parshan += " " + parts.shift(); 
    }

    let simanInHebrew = parts.shift();
    let saifInHebrew = parts.shift();
    
    
    // Check if it can be a prefix and save the matching key
    matchingKey = Object.keys(shulchanAruch_parshanim).find(key => key.startsWith(parshan));
    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    parshan = shulchanAruch_parshanim[matchingKey];


    simanInHebrew = simanInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    // Convert Hebrew numerals to integer for daf
    const siman = hebrewToNumber(simanInHebrew);
    if (isNaN(siman) ) {  // 
        showError("סימן לא תקני");
        return;
    }
    
    saifInHebrew = saifInHebrew.replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    // Convert Hebrew numerals to integer for halacha
    const saif = hebrewToNumber(saifInHebrew);
    if (isNaN(saif) ) {  
        showError("סעיף לא תקני");
        return;
    } 

    const url = `https://shulchanarukh.alhatorah.org/Dual/${parshan}/${helek}/${siman}.${saif}}#e0n6`
    chrome.tabs.create({ url: url });
    return;
}
