console.log('download script appended');
function downloadEntry(event) {
  console.log(event);
  event.stopPropagation();
  console.log('donwloading entry')
  event.preventDefault();
  let dateOb = new Date();
  let date = dateOb.getDate();
  let month = dateOb.getMonth();
  let year = dateOb.getFullYear();

  let dateString = date + "_" + (month + 1) + "_" + year;

  let inputs = event.target.getElementsByTagName("input");
  console.log('inputs: ', inputs)
  let content = `${dateString}: \n Feelings:\n ${inputs[0].value}\n Why:\n ${inputs[1].value}\n Conclusion:\n ${inputs[2].value}`;
  formatAndSave(`journal_entry_${dateString}`, content);
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

