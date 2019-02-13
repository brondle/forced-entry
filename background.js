  chrome.runtime.onInstalled.addListener(function() {
    chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      //close tab if so requested
      if (request.greeting == "close") {
        chrome.tabs.getSelected(function(tab) {
          chrome.tabs.remove(tab.id, function() { });
        });
      }
    });
   });
