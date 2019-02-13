function downloadEntry(event) {
  let action = document.activeElement.id; //get id of submit button used
  event.stopPropagation();
  event.preventDefault();
  // get and concat date info for entry title
  let dateOb = new Date();
  let date = dateOb.getDate();
  let month = dateOb.getMonth();
  let year = dateOb.getFullYear();

  let dateString = date + "_" + (month + 1) + "_" + year;
  //get input content
  let inputs = event.target.getElementsByTagName("textarea");
  //write content to javascript template
  let content = `${dateString}: \n Feelings:\n ${inputs[0].value}\n Why:\n ${inputs[1].value}\n Conclusion:\n ${inputs[2].value}`;
  formatAndSave(`journal_entry_${dateString}`, content);
  if (action  === "stay") {
    //if user wants to stay on page, remove the blocker
    removeBlocker();
  }
  if (action === "go") {
    //if user has changed their mind, close the tab
    window.postMessage({ greeting: "close" });
  }
 }

//fixme this is gross
// basically confirms that current visible textarea has met character limit, hides it, then shows the next one. at end all are visible for edits (not sure if this is desirable behavior or not but i usually like to edit mine once i've had time to think?)
let complete = 0;
function nextStep() {
  let inputs = document.getElementById("entry").getElementsByClassName("parent");
  Array.from(inputs).forEach((i, index) => {
    let textArray = i.getElementsByTagName("textarea");
    if (textArray.length) {
      let textArea = textArray[0];
      console.log('length: ', textArea.value.length);
      console.log(textArea.attributes.minlength.value);
      if (!i.classList.contains('hidden') && textArea.value.length >= textArea.attributes.minlength.value) {
        i.className += ' hidden';
        inputs[index + 1].classList.remove('hidden');
        complete++;
      }
    }
    if (complete >=3) {
      Array.from(inputs)[inputs.length-1].style.display = 'block';
      document.getElementById('next').style.display = 'none';
    }
  })
}

function removeBlocker() {
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

