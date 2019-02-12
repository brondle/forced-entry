  chrome.runtime.onInstalled.addListener(function() {
    console.log('extension running');
    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log("running etension");
    });
   });
