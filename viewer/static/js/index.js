

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

import {viewerApp} from "./timeline.js"
import {addEvent, getEvents} from "./eventsbar.js"
import{getArticles} from "./nytimessearch.js"
//import {loadPolicy} from "./policyselector"
import {statsMain} from "./stats.js"


let monthsText = {"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May",
			  "06":"Jun","07":"Jul","08":"Aug","09":"Sep",
			  "10":"Oct","11":"Nov","12":"Dec"}

//setReaderContent(filepath);
let dates = new Array();//getCommitDates(filepath);

viewerApp();

let e = {link: "https://www.google.com", image: "images/event_image.jpg", desc: "Hi there partner"}
getEvents();
//setURL(20120101,20120103,'security')
getArticles();
statsMain();
