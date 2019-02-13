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
  let content = `${dateString}: \n Feelings:\n ${inputs[0].value}\n Why:\n ${inputs[1].value}\n Conclusion:\n ${inputs[2].value}`;
  // commenting out ofr testing  formatAndSave(`journal_entry_${dateString}`, content);
  if (action  === "stay") {
    removeBlocker();
  }
  if (action === "go") {
    window.postMessage({ greeting: "close" });
  }
 }

//fixme this is gross
let complete = 0;
function nextStep() {
  let inputs = document.getElementById("entry").getElementsByClassName("parent");
  Array.from(inputs).forEach((i, index) => {
    console.log('i: ', i);
    let textArray = i.getElementsByTagName("textarea");
    if (textArray.length) {
      let textArea = textArray[0];
      console.log('text area: ', textArea.value);
      console.log('attributes: ', textArea.attributes);
      console.log(i.style.display);
      if (!i.classList.contains('hidden') && textArea.value.length >= textArea.attributes.minlength.value) {
        i.className += ' hidden';
        inputs[index + 1].classList.remove('hidden');
        complete++;
      }
    }
    console.log('complete: ', complete)
    if (complete >=3) {
      Array.from(inputs).forEach((i) => {
        i.style.display = 'block';
      })
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

