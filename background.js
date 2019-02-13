  chrome.runtime.onInstalled.addListener(function() {
    console.log('extension running');
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('request: ', request)
      if (request.greeting == "close") {
        chrome.tabs.getSelected(function(tab) {
          console.log('tab: ', tab)
          chrome.tabs.remove(tab.id, function() { });
        });
      }
    });
   });
