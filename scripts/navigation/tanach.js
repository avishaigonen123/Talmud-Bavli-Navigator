

function tanach(parts){
    let perekInHebrew;
    let pasukInHebrew;

    let book = parts.shift();
    while(tanach_books.find(m => m[0].startsWith(book + " " + parts[0])))
        book += " " + parts.shift();
    

    // Find the if the book exists in the book list
    const bookInfo = tanach_books.find(m => m[0] === book );
    if (!bookInfo){
        showError("ספר לא נמצא בתנ\"ך");
        return;
    }
    // parshanim case
    if(parts.length > 2){
        tanach_parshanim_func(parts, book, bookInfo);
        return;
    }

    if(parts.length == 1){
        parts[1] = 'א';
    }
    parts.reverse();
    pasukInHebrew = parts[0].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    perekInHebrew = parts[1].replace(/[^א-ת]/g, '');  // Only keep Hebrew letters
    
    const bookInEnglish = bookInfo[1][1];
    const prakimList = bookInfo[1][0];

    // Convert Hebrew numerals to integer for perek
    const perek = hebrewToNumber(perekInHebrew);
    if (isNaN(perek) || perek > prakimList.length ) {  
        showError(`פרק לא תקני, הפרק המקסימלי ב${book} הוא פרק ${numberToHebrewString(prakimList.length)}`);
        return;
    }
    
    // Convert Hebrew numerals to integer for pasuk
    const pasuk = hebrewToNumber(pasukInHebrew);
    if (isNaN(perek) || pasuk > prakimList[perek-1] ) {  // 
        showError(`הפסוק המקסימלי ב${book} פרק ${perekInHebrew} הוא פסוק ${numberToHebrewString(prakimList[perek-1])}`);
        return;
    }
    
    const url = `https://mg.alhatorah.org/Tanakh/${bookInEnglish}/${perek}.${pasuk}`;
    chrome.tabs.create({ url: url });
    return;
}
