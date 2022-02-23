import * as d3 from 'd3';

import {getYFromDate, showEventDate, hideEventDate} from "./timeline.js"

function addEvent(event){
  addEventToSideBar(event);
}

function addEventToSideBar(event){

  let eventsbar = document.getElementById('eventsBar');

  let card = document.createElement("div");
  card.classList.add("card");

  let link = document.createElement("a");
  link.classList.add("eventLink");
  link.setAttribute("href", event.link);
  link.setAttribute("target", "_blank");

  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", event.image);

  let div = document.createElement("div");
  div.classList.add("eventDescNew");
  div.classList.add("card-body");

  let heading = document.createElement("h6");
  heading.classList.add("card-title");
  heading.innerHTML = event.desc;

  let desc = document.createElement("p");
  desc.classList.add("card-text");
  desc.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";

  let date = document.createElement("p");
  date.classList.add("date-text");
  date.classList.add("card-subtitle");
  date.classList.add("mb-2");
  date.classList.add("text-muted");
  date.innerHTML = "April 10, 2018";

  div.appendChild(heading);
  div.appendChild(desc);
  div.appendChild(date);
  
  link.appendChild(img);
  link.appendChild(div);
  card.appendChild(link);
  eventsbar.appendChild(card);
}
function getEvents(){
	d3.csv("testURLs.csv").then(data =>{
		data.forEach(element => {
			addEvent(element);
      //addEventToTimeLine(element);
		});
    d3.select('svg')
			.selectAll('event_circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('r', 5)
			.attr('fill', 'red')
			.attr('cx', d => getYFromDate(d))
			.attr('cy', 10)
			.on('mouseover', showEventDate)
			.on('mouseout', hideEventDate)
	});
}

export{
  addEvent,
  getEvents
}