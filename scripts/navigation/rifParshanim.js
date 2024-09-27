// ----------------------------------------------------
// Parshanim Rif case
// ----------------------------------------------------
function rif_parshanim_func(parts, masechet) {
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
    
    // Check if it can be a prefix and save the matching key
    const matchingKey = Object.keys(rif_parshanim).find(key => key.startsWith(parshan));

    if (!matchingKey) {
        showError("פרשן לא נמצא");
        return;
    }
    
    parshan = rif_parshanim[matchingKey];

    const url = `https://rif.alhatorah.org/Dual/${parshan}/${masechet}/${daf}${amud}`;
    chrome.tabs.create({ url: url });
    return;
}
