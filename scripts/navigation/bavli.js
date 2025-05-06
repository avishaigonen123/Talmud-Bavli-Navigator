// ----------------------------------------------------
// gmara bavli case
// ----------------------------------------------------
function bavli(parts) {
    let masechet = parts.shift();
    while( bavli_masechtot.find(m => m[0].startsWith(masechet + " " + parts[0])))
        masechet += " " + parts.shift();
    
    // case parshanim, maybe he tries "על התורה"
    if(parts.length > 1 && parts[parts.length - 1] != 'הדף' && parts[parts.length - 2] != 'צורת') {
        bavli_parshanim_func(parts, masechet);
        return;
    }
    if(parts < 1)
        return;

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
    
    parts.reverse();
    if (parts[0] == "הדף" && parts[1] == "צורת") {
        // Calculate the global page number
        const globalPage = calculateGlobalPage(masechet, daf, amud);

        if (isNaN(globalPage)) {
            showError(globalPage);  // Display error message
        } else {
            // Navigate to the corresponding page on Daf Yomi
            const url = `https://www.daf-yomi.com/Dafyomi_Page.aspx?id=${globalPage}&vt=1&fs=0`;
            chrome.tabs.create({ url: url });
        }
    }
    else {
        masechet = masechetInfo[1][1]; // find the english word

        // Convert Hebrew numerals to integer for daf
        const url = `https://shas.alhatorah.org/Triple/Rashi/Tosafot/${masechet}/${daf}${amud}`;
        chrome.tabs.create({ url: url });
        return;
        
    }

}