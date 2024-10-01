
// ----------------------------------------------------
// shulchanAruch
// ----------------------------------------------------
function shulchanAruch(parts){
    parts.shift(); // remove first part, שו"ע
    
    let helek = parts.shift();
    helek += " " + parts.shift();
    

    // Check if it can be a prefix and save the matching key
    const matchingKey = Object.keys(shulchanAruch_books).find(key => key.startsWith(helek));
    if (!matchingKey) {
        showError("חלק לא נמצא");
        return;
    }
    helek = shulchanAruch_books[matchingKey];
    
    // case parshanim
    if(parts.length > 2){
        shulchanAruch_parshanim_func(parts, helek);
        return;
    }
    let simanInHebrew = parts.shift();
    let saifInHebrew = parts.shift();
    
    
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

    const url = `https://shulchanarukh.alhatorah.org/Full/${helek}/${siman}.${saif}}#e0n6`
    chrome.tabs.create({ url: url });
    return;
}