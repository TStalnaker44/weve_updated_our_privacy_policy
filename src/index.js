
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

import {app} from "./timeline.js"
import {addEvent, getEvents} from "./eventsbar.js"

loadPolicy("facebook_test.html");
app();
let e = {link: "https://www.google.com", image: "images/event_image.jpg", desc: "Hi there partner"}
getEvents();
