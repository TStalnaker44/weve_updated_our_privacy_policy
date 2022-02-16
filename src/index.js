
// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
function loadPolicy(file){
    let elmnt = document.getElementById("documentReader");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
      }
      return;
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    return;
}

import {
  app
} from "./timeline.js"

loadPolicy("facebook_test.html");
app()
// d3.csv("facebook_timestamps.csv").then(
//   data => {
//     d3.select('svg')
//     .selectAll('circle')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('r', 5)
//     .attr('fill', 'green')
//     .attr('cx', 100)
//     .attr('cy', 100)

//     console.log("Hello");
//   }
// );
