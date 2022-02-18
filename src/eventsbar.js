import * as d3 from 'd3';

function addEvent(event){

  let eventsbar = document.getElementById('eventsBar');

  let div = document.createElement("div");
  div.classList.add("event");

  let link = document.createElement("a");
  link.classList.add("eventLink");
  link.setAttribute("href", event.link);

  let img = document.createElement("img");
  img.classList.add("eventImg");
  img.setAttribute("src", event.image);

  let desc = document.createElement("p");
  desc.classList.add("eventDesc");
  desc.innerHTML = event.desc;
  
  link.appendChild(img);
  link.appendChild(desc);
  div.appendChild(link);
  eventsbar.appendChild(div);
}

function getEvents(){
	d3.csv("testURLs.csv").then(data =>{
		let temp = data;
		data.forEach(element => {
			addEvent(element);
		});
	});
}

export{
  addEvent,
  getEvents
}