document.getElementById("button1").addEventListener("click", inject);

function inject(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        if (tabs[0] === undefined)
            return;
        let url = tabs[0].url;
        if (url.indexOf("exam.net") === -1 || url === undefined)
            return;
        chrome.extension.getBackgroundPage().inject();
    });
}