// ----------------------------------------------------
// search case
// ----------------------------------------------------
function search(parts) {
    parts.shift();
    query = parts.join(" ");
    // search the query
    const url = `https://library.alhatorah.org/Search?t=${query}`;
    chrome.tabs.create({ url: url });

}