// ----------------------------------------------------
// Navigation logic for Talmud, Yerushalmi, Rambam, Parshanim
// ----------------------------------------------------

function navigateToPage() {
    const query = document.getElementById('query').value.trim();

    // Parsing the user input (e.g., "גיטין לג")
    const parts = query.split(" ");

    // example: יהושע א א 
    if(tanach_books.find(m => m[0].startsWith(parts[0])))
        tanach(parts);

    // example: גיטין פב
    else if(bavli_masechtot.find(m => m[0].startsWith(parts[0])))
        bavli(parts);
    
    // example: ירושלמי גיטין א א
    else if(parts[0] == "ירושלמי")
        yerushalmi(parts);

    // example: רמבם אישות א א
    else if(parts[0] == "רמבם")
        rambam(parts);
    
    // example: תוספתא גיטין א א
    else if(parts[0] == "תוספתא")
        tosefta(parts);
    
    // example: תוספתא גיטין א א
    else if(parts[0] == "ריף")
        rif(parts);

    // example: שו"ע יורה דעה א א 
    else if(parts[0] == 'שו"ע')
        shulchanAruch(parts);

    else {
        showError("הכנס שאילתא חוקית");
        return;
    }
    
}

