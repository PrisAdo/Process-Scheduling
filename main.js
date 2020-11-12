//import { Schedules } from "/Schedules.js";
import { Queue } from "/Queue.js";

document.getElementById("inputfile").addEventListener("change", function () {
  let file = this.files[0];

  var fr = new FileReader();
  fr.onload = function (progressEvent) {
    document.getElementById("output").textContent = fr.result;

    //for each line store the letter arrival time and end time
    let process = [];
    let arrival = [];
    let time = [];
    let totalTime = 0;

    let lines = this.result.split("\n"); // split each line of text file into its on arrray element
    for (let line = 0; line < lines.length; line++) {
      let words = lines[line].split(" "); //take process, arrival time and end time for each line and save
      process.push(words[0]);
      arrival.push(parseInt(words[1]));
      time.push(parseInt(words[2]));

      totalTime += parseInt(words[2]); //sum up total time it will take to run all processes
    }
    //console.log(process);
    //console.log(arrival);
    //console.log(time);

    roundRobin(process, arrival, time, totalTime);
  };

  fr.readAsText(file); //shows file content on web page

  let roundRobin = (p, a, t, tt) => {
    let p_queue = new Queue();
    let t_queue = new Queue();

    let RR_Map = new Map();

    let currProcess = 0;
    let currTime = 0;

    let i;
    for (i = 0; i < tt; i++) {
      if (!p_queue.isEmpty()) {
        //pop from both queues
        currProcess = p_queue.dequeue();
        currTime = t_queue.dequeue();
        //hashmap set(i, process)
        RR_Map.set(i, currProcess);
        //subtract from time
        currTime--;
      }

      //if arrival array contains i, then get index location and push process onto queue
      if (a.includes(i)) {
        //add new process if there is one
        let ind = a.indexOf(i);
        //queue01 push process(i)
        p_queue.enqueue(p[ind]);
        //queue02 push time(i)
        t_queue.enqueue(t[ind]);
      }

      //push both values back into stack if the time is not zero
      if (currTime > 0) {
        p_queue.enqueue(currProcess);
        t_queue.enqueue(currTime);
      }
    }

    console.log(RR_Map.get(0), RR_Map.get(1));
  };
});
