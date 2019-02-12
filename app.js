console.log('injecting script');

let body = document.getElementsByTagName('body')[0];
console.log(body);
let blocker = document.createElement("div");
blocker.id = "blocker";

//TODO: pretty sure script injection for download Entry is unnecessary - tried a bunch of workarounds for waht i thought was a scoping issue but turned out to be an unclosed bracket on the submit button. might be worth revisiting for optimization
let entry = `<form id= "entry" onsubmit="downloadEntry(event)">
  How are you feeling? <br>
  <input type="text"><br>
  Why are you visiting this website? <br>
  <input type="text"> <br>
  Is that a good reason? <br>
  <input type="text"> <br>
  <input type="submit" value="Submit">
</form>`;


let script = document.createElement('script');
script.type = 'text/javascript';
script.src = chrome.extension.getURL('download.js');
document.head.appendChild(script);


blocker.innerHTML = entry;
body.appendChild(blocker);
