
import * as d3 from 'd3';

// Temporary values used while setting up timeline design
let startYear = 2005;
let endYear = 2019;
let range = endYear - startYear;

let monthsPos = {"01":0,"02":31,"03":59,"04":90,"05":120,
			  "06":151,"07":181,"08":212,"09":243,
			  "10":273,"11":304,"12":334};

let monthsText = {"01":"Jan","02":"Feb","03":"Mar","04":"Apr","05":"May",
			  "06":"Jun","07":"Jul","08":"Aug","09":"Sep",
			  "10":"Oct","11":"Nov","12":"Dec"}

function getYFromDate(d){
	let year = Number(d.year);
	let month = monthsPos[d.month];
	let day = Number(d.day);
	let point = 365 * (year - startYear) + month + day;
	let SVGwidth = document.getElementById("viz").clientWidth;
	let padding = 20;
	let range = 365 * (endYear + 1 - startYear);
	point = Math.round(point * ((SVGwidth-(2*padding)) / range)) + padding;
	return point;
}

function app(dates) {

	dates.then( data => {
		d3.select('svg')
			.selectAll('circle')
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
	let date = monthsText[d.month] + " " + d.day + ", " + d.year
	hover.innerHTML = "<div>" + date + "</div>";
}

function hideEventDate(){
	document.getElementById("eventHover").style.display = "none";
}

export {
	app
}