// ----------------------------------------------------
// Initialize the popup windows for each button + load data
// ----------------------------------------------------

async function init() {
    await loadData();
    
    // Populate the popups with the relevant lists
    setupPopupButton('tanachBtn', tanach_books.map(item => item[0]), 'תנ"ך');
    setupPopupButton('tanachParshanimBtn', Object.keys(tanach_parshanim), 'פרשנים תנ"ך');

    setupPopupButton('mishnaBtn', Object.keys(mishna_masechtot), 'משנה');
    setupPopupButton('mishnaParshanimBtn', Object.keys(mishna_parshanim), 'פרשנים משנה');
    
    setupPopupButton('bavliBtn', bavli_masechtot.map(item => item[0]), 'בבלי');
    setupPopupButton('bavliParshanimBtn', Object.keys(bavli_parshanim), 'בבלי פרשנים');

    setupPopupButton('yerushalmiBtn', bavli_masechtot.map(item => item[0]), 'ירושלמי');
    setupPopupButton('yerushalmiParshanimBtn', Object.keys(bavli_parshanim), 'ירושלמי פרשנים');

    setupPopupButton('toseftaBtn', tosefta_masechtot.map(item => item[0]), 'תוספתא');
    setupPopupButton('toseftaParshanimBtn', Object.keys(tosefta_parshanim), 'פרשנים תוספתא');

    setupPopupButton('rifBtn', rif_masechtot.map(item => item[0]), 'ריף');
    setupPopupButton('rifParshanimBtn', Object.keys(rif_parshanim), 'פרשנים ריף');

    setupPopupButton('rambamBtn', Object.keys(ramabm_halakim), 'רמבם');
    setupPopupButton('rambamParshanimBtn', Object.keys(ramabm_parshanim), 'פרשנים רמבם');
    
    setupPopupButton('shulchanAruchBtn', Object.keys(shulchanAruch_books), 'שו"ע');
    setupPopupButton('shulchanAruchParshanimBtn', Object.keys(shulchanAruch_parshanim), 'פרשנים שו"ע');
    
    setupPopupButton('turBtn', Object.keys(tur_books), 'טור');
    setupPopupButton('turParshanimBtn', Object.keys(tur_parshanim), 'פרשנים טור');

    console.log('Popup windows are ready.');
}

// Call init to initialize and populate popup windows
init();