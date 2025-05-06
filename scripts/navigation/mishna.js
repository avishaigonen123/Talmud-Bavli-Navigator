
// ----------------------------------------------------
// Mishan
// ----------------------------------------------------
function mishna(parts){
    parts.shift(); // remove first word, "משנה"
    
    let masechet = parts.shift();
    while(Object.keys(mishna_masechtot).find(key => key.startsWith(masechet + " " + parts[0])))
        masechet += " " + parts.shift();    

    // Check if it can be a prefix and save the matching key
    let matchingKey = Object.keys(mishna_masechtot).find(key => key.startsWith(masechet));
    if (!matchingKey) {
        showError("מסכת לא נמצאה");
        return;
    }
    masechet = mishna_masechtot[matchingKey];
    
    // case parshanim
    if(parts.length > 2){
        mishna_parshanim_func(parts, masechet);
        return;
    }
    if(parts.length == 1){
        parts[1] = 'א';
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

    const url = `https://mishna.alhatorah.org/Main/${masechet}/${perek}.${halacha}`
    chrome.tabs.create({ url: url });
    return;
}
