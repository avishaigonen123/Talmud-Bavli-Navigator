
// ----------------------------------------------------
// tur
// ----------------------------------------------------
function tur(parts){
    parts.shift(); // remove first part, טור
    
    let helek = parts.shift(); // for case the user wants one word, eg "אוח"
    // helek += " " + parts.shift();
    

    // Check if it can be a prefix and save the matching key
    
    let matchingKey = Object.keys(shulchanAruch_books).find(key => key.startsWith(helek));
    if (!matchingKey) {
        showError("חלק לא נמצא");
        return;
    }
    lookahead = helek + " " + parts[0]; // for case the user wants two words, eg "אורח חיים"
    if(Object.keys(shulchanAruch_books).find(key => key.startsWith(lookahead))){
        matchingKey = lookahead
        parts.shift(); // remove first part
    }   
    helek = shulchanAruch_books[matchingKey];
    
    // case parshanim
    if(parts.length > 2){
        shulchanAruch_parshanim_func(parts, helek);
        return;
    }
    if(parts.length == 1){
        parts[1] = 'א';
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

    const url = `https://tur.alhatorah.org/Main/${helek}/${siman}.${saif}`
    chrome.tabs.create({ url: url });
    return;
}
