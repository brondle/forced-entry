console.log('download script appended');
function downloadEntry(event) {
  let action = document.activeElement.id; //get id of submit button used
  event.stopPropagation();
  console.log('donwloading entry')
  event.preventDefault();
  let dateOb = new Date();
  let date = dateOb.getDate();
  let month = dateOb.getMonth();
  let year = dateOb.getFullYear();

  let dateString = date + "_" + (month + 1) + "_" + year;

  let inputs = event.target.getElementsByTagName("textarea");
  console.log('inputs: ', inputs)
  let content = `${dateString}: \n Feelings:\n ${inputs[0].value}\n Why:\n ${inputs[1].value}\n Conclusion:\n ${inputs[2].value}`;
  // commenting out ofr testing  formatAndSave(`journal_entry_${dateString}`, content);
  console.log('action: ', action)
  if (action  === "stay") {
    removeBlocker();
  }
  if (action === "go") {
    window.postMessage({ greeting: "close" });
  }
 }

function removeBlocker() {
  console.log('removing blocker');
  let blocker = document.getElementById("blocker");
  blocker.style.height = 0;
}


function formatAndSave(filename, text) {
  // indebted to https://stackoverflow.com/questions/2897619/using-html5-javascript-to-generate-and-save-a-file for this solution
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  pom.setAttribute('download', filename);

  if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

