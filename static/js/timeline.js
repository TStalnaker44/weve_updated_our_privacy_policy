
import * as d3 from 'd3';

import {loadPolicy} from "./policyselector.js";

let width = document.getElementById('viz').clientWidth
const xScale = d3.scaleTime()
	.domain([new Date("2005-01-01"), new Date("2020-01-01")])
	.range([0, width])

function viewerApp(dates) {

	dates.then( data => {

		addSelections(data);

		d3.select('svg')
			.selectAll('policy_circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('r', 5)
			.attr('fill', '#0e59bb')
			//.attr('cx', d => getYFromDate(d))
			.attr('cx', d => xScale(new Date(Number(d.Year), (d.Phase == "A" ? 0 : 6), 1)))
			.attr('cy', 10)
			.on('mouseover', showEventDate)
			.on('mouseout', hideEventDate)
			.on('click', updatePolicy)
	})	
}

function updatePolicy(ev, d){
	var file = "example_policies/" + d.Year + d.Phase + ".html"
	loadPolicy(file);
	document.getElementById('versionSelect').value = d.Year + d.Phase
}

function showEventDate(ev, d){
	let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
	let date = d.Year + d.Phase
	hover.innerHTML = "<div>" + date + "</div>";
}

function hideEventDate(){
	document.getElementById("eventHover").style.display = "none";
}

function addSelections(data){
	
	let selector = document.getElementById('versionSelect');

	let i = 0;
	data.reverse().forEach(el => {
		let option = document.createElement("option");
		option.setAttribute("value", el.Year + el.Phase); //This can eventually be the commit id
		option.innerHTML = el.Year + el.Phase;
		selector.appendChild(option);
		i += 1;
	});

	selector.addEventListener("change", function() {
        var file = "example_policies/" + selector.value + ".html";
		loadPolicy(file);
    });
}

export {
	viewerApp,
	showEventDate,
	hideEventDate,
	xScale
}