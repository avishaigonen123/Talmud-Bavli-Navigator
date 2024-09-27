
// ----------------------------------------------------
// Rambam
// ----------------------------------------------------
function rambam(parts){
    let masechet = parts.shift();
    
    let helek = parts.shift();
    if (helek == "שביתת" ){
        masechet += " " + parts.shift();
    }

    // Check if it can be a prefix and save the matching key
    const matchingKey = Object.keys(ramabm_halakim).find(key => key.startsWith(helek));
    if (!matchingKey) {
        showError("חלק לא נמצא");
        return;
    }
    helek = ramabm_halakim[matchingKey];
    
    // case parshanim
    if(parts.length > 2){
        rambam_parshanim_func(parts, helek);
        return;
    }
    let perekInHebrew = parts.shift();
    let halachaInHebrew = parts.shift();
    
    
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
