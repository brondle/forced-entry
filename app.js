//'blocker' hides main body of website
let body = document.getElementsByTagName('body')[0];
let blocker = document.createElement("div");
blocker.id = "blocker";

//TODO: pretty sure script injection for download Entry is unnecessary - tried a bunch of workarounds for waht i thought was a scoping issue but turned out to be an unclosed bracket on the submit button. might be worth revisiting for optimization - honestly might as well just put everything in the appended script?
//write form to javascript template
let entry = `<form id="entry" onsubmit="downloadEntry(event)">
  <div class="parent">
  How are you feeling? <br>
  <textarea rows="3" cols="50" minlength="240"></textarea><br>
  </div>
  <div class="parent hidden">
  Why are you visiting this website? <br>
  <textarea rows="3" cols="50" minlength="100"></textarea><br>
  </div>
  <div class="parent hidden">
  Is that a good reason? Why or why not?<br>
  <textarea rows="3" cols="50" minlength="50"></textarea><br>
  </div>
  <div class="parent hidden">
  <input class="button" type="submit" id="stay" value="Stay">
  <input class="button "type="submit" id="go" value="Go">
  </div>
  <button class="button" type="button" id="next" onClick="nextStep()">Next</button>
</form>`;

//event listener that tells tab to close if message bubbles up from download.js
window.addEventListener("message", function(event) {
  if (event.source != window) {
    return;
  }
  if (event.data.greeting === "close") {
    chrome.runtime.sendMessage({greeting: "close"});
  }
});

//tack it all up there
let script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.extension.getURL('download.js');
document.head.appendChild(script);

blocker.innerHTML = entry;
body.appendChild(blocker);
