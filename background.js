var hacking_state = 0; 

chrome.webRequest.onErrorOccurred.addListener(
    function(details) {
        hacking_state = 0;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
              tabs[0].id,
              {code: 'alert("Error: the script was not injected successfully! The hack might not work!")'});
        });
    },
   {urls: ["*://cdn.exam.net/js/app.js?id=*"]}
);

chrome.webRequest.onCompleted.addListener(
    function(details) {
        hacking_state = 0;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
              tabs[0].id,
              {code: 'alert("Successfully injected the script!")'});
        }); 
    },
   {urls: ["chrome-extension://*/inject_scripts/inject_exitd.txt"]}
);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (hacking_state === 0) 
            return;
        return {redirectUrl: chrome.extension.getURL("inject_scripts/inject_exitd.txt")};
    },
    {
        urls: [
            "*://cdn.exam.net/js/app.js?id=*",
        ],
        types: ["script"]
    },
    ["blocking"]
);

function inject() {
    hacking_state = 1;
    chrome.tabs.reload({bypassCache: true}, function(){});
}