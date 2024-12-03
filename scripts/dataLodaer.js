// ----------------------------------------------------
// loading the data from the json files
// ----------------------------------------------------

let bavli_masechtot = [];
let bavli_parshanim = {};

let ramabm_halakim = {};
let ramabm_parshanim = {};

let mishna_masechtot = {};
let mishna_parshanim = {};

let rif_masechtot = [];
let rif_parshanim = {};

let shulchanAruch_books = {};
let shulchanAruch_parshanim = {};

let tanach_books = [];
let tanach_parshanim = {};

let tosefta_masechtot = [];
let tosefta_parshanim = {};

let tur_books = {};
let tur_parshanim = {};

let yerushalmi_masechtot = [];
let yerushalmi_parshanim = {};

// load bavli.json
async function loadMasechtotBavli() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/bavli.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        bavli_masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load bavliParshanim.json
async function loadMasechtotBavliParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/bavliParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        bavli_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}


// load rambam.json
async function loadRambam() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/rambam.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        ramabm_halakim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load rambamParshanim.json
async function loadRambamParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/rambamParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        ramabm_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

// load mishna.json
async function loadMishna() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/mishna.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        mishna_masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load mishnaParshanim.json
async function loadMishnaParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/mishnaParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        mishna_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}



// load rif.json
async function loadRif() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/rif.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        rif_masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load rifParshanim.json
async function loadRifParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/rifParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        rif_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}


// load shulchanAruch.json
async function loadShulchanAruch() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/shulchanAruch.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        shulchanAruch_books = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load shulchanAruchParshanim.json
async function loadShulchanAruchParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/shulchanAruchParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        shulchanAruch_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}


// load tanach.json
async function loadTanach() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/tanach.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tanach_books = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load tanachParshanim.json
async function loadTanachParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/tanachParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tanach_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}


// load tosefta.json
async function loadTosefta() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/tosefta.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tosefta_masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load toseftaParshanim.json
async function loadToseftaParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/toseftaParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tosefta_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}

// load tur.json
async function loadTur() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/tur.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tur_books = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load turParshanim.json
async function loadTurParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/turParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        tur_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}



// load yerushalmi.json
async function loadYerushalmi() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/yerushalmi.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        yerushalmi_masechtot = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}
// load yerushalmiParshanim.json
async function loadYerushalmiParshanim() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/yerushalmiParshanim.json'));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        yerushalmi_parshanim = await response.json(); // Parse JSON and assign it to parshanim
    } catch (error) {
        console.error('Error fetching the JSON file:', error);
    }
}


// Load all data files
async function loadData(){
    await loadMasechtotBavli();
    await loadMasechtotBavliParshanim();
    await loadRambam();
    await loadRambamParshanim();
    await loadMishna();
    await loadMishnaParshanim();
    await loadRif();
    await loadRifParshanim();
    await loadShulchanAruch();
    await loadShulchanAruchParshanim();
    await loadTanach();
    await loadTanachParshanim();
    await loadTosefta();
    await loadToseftaParshanim();
    await loadTur();
    await loadTurParshanim();
    await loadYerushalmi();
    await loadYerushalmiParshanim();
    
    console.log("Data files loaded successfully");
}