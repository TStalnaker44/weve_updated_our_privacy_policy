
import * as d3 from 'd3';

// Temporary values used while setting up timeline design
let startYear = 2005;
let endYear = 2019;

let months = {"Jan":0,"Feb":31,"Mar":59,"Apr":90,"May":120,
			  "Jun":151,"Jul":181,"Aug":212,"Sep":243,
			  "Oct":273,"Nov":304,"Dec":334}

function getYFromDate(d){
	let year = Number(d.Year);
	let month = months[d.Month];
	let day = Number(d.Day);
	let point = 365 * (year - startYear) + month + day;
	let SVGwidth = document.getElementById("viz").clientWidth;
	let padding = 20;
	let range = 365 * (endYear + 1 - startYear);
	point = Math.round(point * ((SVGwidth-(2*padding)) / range)) + padding;
	return point;
}

function app() {

	d3.dsv(' ', 'facebook_timestamps.csv').then(data => {

		addSelections(data);
		
		d3.select('svg')
			.selectAll('policy_circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('r', 5)
			.attr('fill', '#0e59bb')
			.attr('cx', d => getYFromDate(d))
			.attr('cy', 10)
			.on('mouseover', showEventDate)
			.on('mouseout', hideEventDate)
	})	
}

function showEventDate(ev, d){
	let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
	let date = d.Month + " " + d.Day + ", " + d.Year
	hover.innerHTML = "<div>" + date + "</div>";
}

function hideEventDate(){
	document.getElementById("eventHover").style.display = "none";
}

function addSelections(data){
	
	let selector = document.getElementById('versionSelect');

	let i = 0;
	data.forEach(el => {
		let option = document.createElement("option");
		option.setAttribute("value", i); //This can eventually be the commit id
		option.innerHTML = el.Month + " " + el.Day + ", " + el.Year;
		selector.appendChild(option);
		i += 1;
	});
}

export {
	app,
	getYFromDate,
	showEventDate,
	hideEventDate
}