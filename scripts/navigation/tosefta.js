// ----------------------------------------------------
// Tosefta
// ----------------------------------------------------
function tosefta(parts){
    parts.shift(); // remove first part, "תוספתא"

    let masechet = parts.shift();
    while(tosefta_masechtot.find(m => m[0].startsWith(masechet + " " + parts[0])))
        masechet += " " + parts.shift();
    
    
    // Check if masechet exists
    const masechetInfo = tosefta_masechtot.find(m => m[0] === masechet);
    if (!masechetInfo) {
        showError("מסכת לא נמצאה");
        return;
    }
    masechet = masechetInfo[1][1];
    
    // case parshanim
    if(parts.length > 2){
        tosefta_parshanim_func(parts, masechet);
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

    const url = `https://tosefta.alhatorah.org/Main/${masechet}/${perek}.${halacha}`
    chrome.tabs.create({ url: url });
    return;    
}