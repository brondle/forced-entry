console.log('injecting script');

let body = document.getElementsByTagName('body')[0];
console.log(body);
let blocker = document.createElement("div");
blocker.id = "blocker";

let entry = `<form id= "entry">
  How are you feeling? <br>
  <input type="text"><br>
  Why are you visiting this website? <br>
  <input type="text"> <br>
  Is that a good reason? <br>
  <input type="text"> <br>
  <input type="submit" value="Submit"
</form>`;


blocker.innerHTML = entry;

body.appendChild(blocker);

