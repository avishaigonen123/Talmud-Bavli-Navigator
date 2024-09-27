// ----------------------------------------------------
// rif case
// ----------------------------------------------------
function rif(parts) {
    parts.shift(); // remove first word
    let masechet = parts.shift();
    if (["מעשר", "עבודה", "ראש", "מועד", "בבא"].includes(masechet)) {
        masechet += " " + parts.shift();
    }
    
    // Find the maximum Daf for the selected Masechet
    const masechetInfo = rif_masechtot.find(m => m[0] === masechet);
    if (!masechetInfo) {
        showError("מסכת לא נמצאה");
        return;
    }
    masechet = masechetInfo[1][1]; // find the english word
    
    // case parshanim
    if(parts.length > 1) {
        rif_parshanim_func(parts, masechet);
        return;
    }

    const dafInHebrew = parts[0].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    const amud = parts[0].endsWith(':') ? 'b' : 'a';  // Detect amud based on input
    
    
    // Convert Hebrew numerals to integer for daf
    const daf = hebrewToNumber(dafInHebrew);
    if (isNaN(daf) || daf < 2) {  // Daf must be at least 2
        showError("בתלמוד הבבלי הדפים מתחילים מדף ב");
        return;
    }
    
    const maxDaf = masechetInfo[1][0] + 1;  // Number of Dafim in the Masechet
    if (daf > maxDaf) {
        showError(`הדף האחרון במסכת ${masechet} הוא דף ${numberToHebrewString(Math.floor(maxDaf))}`);
        return;
    }

    // Navigate to the corresponding page on Daf Yomi
    const url = `https://rif.alhatorah.org/Full/${masechet}/${daf}${amud}`;
    chrome.tabs.create({ url: url });



}