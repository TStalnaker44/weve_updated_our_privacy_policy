
import * as d3 from 'd3';

// Temporary values used while setting up timeline design
let startYear = 2005;
let endYear = 2019;
let range = endYear - startYear;

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
		
		d3.select('svg')
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('r', 5)
			.attr('fill', 'green')
			.attr('cx', d => getYFromDate(d))
			.attr('cy', 10)

		d3.select('svg')
			.selectAll('line')
			.data(data)
			.enter()
			.append('line')
			.attr("x1", 0)
			.attr("y1", 10)
			.attr("x2", 2000)
			.attr("y2", 10)
	})
	
}

export {
	app
}