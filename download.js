console.log('download script appended');
function downloadEntry(event) {
  console.log(event);
  event.stopPropagation();
  console.log('donwloading entry')
  event.preventDefault();
  let dateOb = new Date();
  let date = dateOb.getDate();
  let month = dateOb.getMonth();
  let year = dateOb.getYear();

  let dateString = date + "_" + (month + 1) + "_" + year;

  let inputs = event.target.getElementsByTagName("input");
  console.log('inputs: ', inputs)
  let content = `${dateString}: \n Feelings:\n ${inputs[0].value}\n Why:\n ${inputs[1].value}\n Conclusion:\n ${inputs[2].value}`;
  window.open("data:application/txt," + encodeURIComponent(content), "_self");
}

