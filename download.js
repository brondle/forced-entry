console.log('download script appended');
function downloadEntry(event) {
  event.preventDefault();
  console.log('donwloading entry')
  let dateOb = new Date();
  let date = dateOb.getDate();
  let month = dateOb.getMonth();
  let year = dateOb.getYear();

  let dateString = date + "_" + (month + 1) + "_" + year;

  let inputs = event.target.getElementsByTagName("input");
  let content = `${dateString}: \n Feelings:\n ${inputs[0]}\n Why:\n ${inputs[1]}\n Conclusion:\n ${inputs[2]}`;
  window.open("data:application/txt," + encodeURIComponent(content), "_self");
}

