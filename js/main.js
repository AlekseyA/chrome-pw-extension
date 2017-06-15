const result = {};
console.log('init extension')


chrome.tabs.onUpdated.addListener((tabId,  changeInfo, tab) => {
    if(changeInfo.status && changeInfo.status == 'complete'){
        if (!result[tab.url] || result[tab.url].loadings < 3) {
            chrome.tabs.sendMessage(tabId, {text: 'text', url: window.location}, () => {
                console.log('sendMessage');
            })
        }
    }
})

chrome.tabs.onCreated.addListener( (tab) => {
    console.log('Tab', tab)
})

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.status == "email")
            sendResponse({'message': 'got email'});
        
        if (result[request.url]) result[request.url].loadings++;
        else result[request.url] = {'loadings': 1}

    }
);
