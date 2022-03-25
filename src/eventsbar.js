import * as d3 from 'd3';

import {hideEventDate, xScale} from "./timeline.js"

const numToMon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

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
  heading.innerHTML = event.heading;

  let desc = document.createElement("p");
  desc.classList.add("card-text");
  desc.innerHTML = "Some quick example text to build on the card title and make up the bulk of the card's content.";

  let date = document.createElement("p");
  date.classList.add("date-text");
  date.classList.add("card-subtitle");
  date.classList.add("mb-2");
  date.classList.add("text-muted");
  date.innerHTML = numToMon[Number(event.Month)] + " " + event.Day + ", " + event.Year;

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
		});
    d3.select('svg')
			.selectAll('event_triangle')
			.data(data)
			.enter()
			.append('path')
      .attr("d", d3.symbol().type(d3.symbolTriangle))
			.attr('fill', 'red')
      .attr("transform", d=> `translate(${xScale(new Date(Number(d.Year), Number(d.Month), Number(d.Day)))}, 10)`)
			.attr('cy', 10)
			.on('mouseover', showEventDate)
			.on('mouseout', hideEventDate)
	});
}

function showEventDate(ev, d){
	let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
	let date = (Number(d.Month)+1) + "/" + d.Day + "/" + d.Year.substring(2)
	hover.innerHTML = "<div>" + date + "</div>";
}

export{
  addEvent,
  getEvents
}