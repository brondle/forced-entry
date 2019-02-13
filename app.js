console.log('injecting script');

let body = document.getElementsByTagName('body')[0];
console.log(body);
let blocker = document.createElement("div");
blocker.id = "blocker";

//TODO: pretty sure script injection for download Entry is unnecessary - tried a bunch of workarounds for waht i thought was a scoping issue but turned out to be an unclosed bracket on the submit button. might be worth revisiting for optimization - honestly might as well just put everything in the appended script?
let entry = `<form id="entry" onsubmit="downloadEntry(event)">
  <div class="parent">
  How are you feeling? <br>
  <textarea rows="3" cols="50" minlength="240"></textarea><br>
  </div>
  <div class="parent hidden">
  Why are you visiting this website? <br>
  <textarea rows="3" cols="50" minlength="140"></textarea><br>
  </div>
  <div class="parent hidden">
  Is that a good reason? Why or why not?<br>
  <textarea rows="3" cols="50" minlength="140"></textarea><br>
  </div>
  <div class="parent hidden">
  <input type="submit" id="stay" value="Stay">
  <input type="submit" id="go" value="Go">
  </div>
  <button id="next" onClick="nextStep()">Next</button>
</form>`;

window.addEventListener("message", function(event) {
  console.log('message event: ', event)
  if (event.source != window) {
    return;
  }
  console.log(event.data.greeting);
  if (event.data.greeting === "close") {
    console.log('firing runtime message');
    chrome.runtime.sendMessage({greeting: "close"});
  }
})

let script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.extension.getURL('download.js');
document.head.appendChild(script);


blocker.innerHTML = entry;
body.appendChild(blocker);
