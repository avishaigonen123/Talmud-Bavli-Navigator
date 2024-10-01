// ----------------------------------------------------
// Yerushalmi
// ----------------------------------------------------
function yerushalmi(parts){
    parts.shift(); // remove first part, "ירושלמי"

    let masechet = parts.shift();
    while(yerushalmi_masechtot.find(m => m[0].startsWith(masechet + " " + parts[0])))
        masechet += " " + parts.shift();
    
    // Check if masechet exists
    const masechetInfo = yerushalmi_masechtot.find(m => m[0] === masechet);
    if (!masechetInfo) {
        showError("מסכת לא נמצאה");
        return;
    }
    masechet = masechetInfo[1][1];
    const prakimList = masechetInfo[1][0];

    // case parshanim
    if(parts.length > 2){
        yerushalmi_parshanim_func(parts, masechet, prakimList);
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

    let halachot_total = halacha;
    for (let i = 0; i < perek-1; i++)
        halachot_total += prakimList[i];

    const url = `https://yerushalmi.alhatorah.org/Full/${masechet}/${halachot_total}`

    chrome.tabs.create({ url: url });
    return;    
}