const result = {};
console.log('init extension')

chrome.tabs.onUpdated.addListener((tabId,  changeInfo, tab) => {
    if(changeInfo.status && changeInfo.status == 'complete'){
        // debugger;
        if(!result[tab.url]) result[tab.url] = {'numLoadings': 1, 'isLoadings': false}
        if (result[tab.url].numLoadings < 3 && !result[tab.url].isLoadings) {
            result[tab.url].isLoadings = true;
            chrome.tabs.sendMessage(tabId, {text: 'text'}, () => {
                console.log('sendMessage');
            })
        }
        if(result[tab.url].numLoadings == 3){
            // reset counter
            setTimeout(_ => {
                result[tab.url].numLoadings = 0;
            }, 5000)
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
        
        // increment counter. It is needed to avoid infinite attempts of login
        result[request.url].numLoadings++;
        result[request.url].isLoading = false;

    }
);
