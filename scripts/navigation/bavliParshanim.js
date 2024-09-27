// ----------------------------------------------------
// Parshanim Bavli case
// ----------------------------------------------------
function bavli_parshanim_func(parts, masechet) {
    parshan = parts.shift();

    // the parshan can be more than one word
    while(parts.length > 1){
        parshan += " " + parts.shift(); 
    }

    const dafInHebrew = parts[0].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    const amud = parts[0].endsWith(':') ? 'b' : 'a';  // Detect amud based on input
    
    // Convert Hebrew numerals to integer for daf
    const daf = hebrewToNumber(dafInHebrew);
    if (isNaN(daf) || daf < 2) {  // Daf must be at least 2
        showError("בתלמוד הבבלי הדפים מתחילים מדף ב");
        return;
    }

    // Find the maximum Daf for the selected Masechet
    const masechetInfo = bavli_masechtot.find(m => m[0] === masechet);
    if (!masechetInfo) {
        showError("מסכת לא נמצאה");
        return;
    }

    const maxDaf = masechetInfo[1][0] + 1;  // Number of Dafim in the Masechet
    if (daf > maxDaf) {
        showError(`הדף האחרון במסכת ${masechet} הוא דף ${numberToHebrewString(Math.floor(maxDaf))}`);
        return;
    }
    
    // Check if it can be a prefix and save the matching key
    const matchingKey = Object.keys(bavli_parshanim).find(key => key.startsWith(parshan));

    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    
    parshan = bavli_parshanim[matchingKey];
    masechet = masechetInfo[1][1];

    const url = `https://shas.alhatorah.org/Dual/${parshan}/${masechet}/${daf}${amud}`;
    chrome.tabs.create({ url: url });
    return;
}
