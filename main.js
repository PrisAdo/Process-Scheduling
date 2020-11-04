document.getElementById("inputfile").addEventListener("change", function () {
  let file = this.files[0];

  var fr = new FileReader();
  fr.onload = function (progressEvent) {
    document.getElementById("output").textContent = fr.result;

    //for each line store the letter arrival time and end time
    let process = [];
    let arrival = [];
    let end = [];

    let lines = this.result.split("\n"); // split each line of text file into its on arrray element
    for (let line = 0; line < lines.length; line++) {
      let words = lines[line].split(" "); //take process, arrival time and end time for each line and save
      process.push(words[0]);
      arrival.push(words[1]);
      end.push(words[2]);
    }

    console.log(lines);
  };

  fr.readAsText(file); //shows file content on web page
});
