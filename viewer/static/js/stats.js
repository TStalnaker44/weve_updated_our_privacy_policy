import * as d3 from 'https://unpkg.com/d3?module';
import {showToolTip, hideToolTip, addSelections, loadPolicy} from "./utils.js"

let config = {
	svg: d3.select('#stats'),
	height: document.getElementById('stats').clientHeight,
	width: document.getElementById('stats').clientWidth,
	attr: "ReadingTime",
	margin:  {left:60, top:10, right:10, bottom:40},
	startDate: new Date("2005-01-01"),
	endDate: new Date("2020-01-01")
}
config.xScale = getXScale(); //Add separate since requires other fields in config to calculate

window.addEventListener('resize', function() {
	config.height = document.getElementById('stats').clientHeight;
	config.width = document.getElementById('stats').clientWidth;
	config.xScale = getXScale();
	getStats();
  });

let data = [];

let fields = ["ReadingTime", "FleschScore", "SmogScore", "LexiconCount", "SentenceCount"];
let field2label = {
	"ReadingTime":"Reading Time in Seconds",
	"FleschScore":"Flesch Reading Score",
	"SmogScore":"Smog Score",
	"LexiconCount":"Lexicon Count",
	"SentenceCount":"Sentence Count"
}

// Replace these with more thought out explanations of fields
let field2desc = {
	"ReadingTime":"Reading Time in Seconds",
	"FleschScore":"Flesch Reading Score",
	"SmogScore":"Smog Score",
	"LexiconCount":"Lexicon Count",
	"SentenceCount":"Sentence Count"
}

function getXScale(){
	return d3.scaleTime()
	.domain([config.startDate, config.endDate])
	.range([config.margin.left, config.width - config.margin.right])
}

async function statsMain(){
	await getData();
	addSelections(data);
	prepareSelector();
	getStats();
}

async function getData(){
	// await d3.csv('facebook_data.csv').then(d => {
	// 	data = d;
	// }) 
	data = policyStats;
}

function prepareSelector(){
    let selector = document.getElementById("fieldSelect");
	fields.forEach(el => {
		let option = document.createElement("option");
		option.setAttribute("value", el);
		option.innerHTML = el;
		selector.appendChild(option);
	});
    selector.addEventListener("change", function() {
		config.attr = selector.value
		getStats()
    });
}

function getStats(){

	config.svg.selectAll("*").remove();

	config.svg.append('g')
		.call(d3.axisBottom(config.xScale)
			.tickFormat(function(date){
				//let month = date.toLocaleString('en-US', {month: 'short'})
				let phase = (date.getMonth() < 6 ? "A" : "B")
				let year = String(date.getFullYear()).substring(2)
				return "'" + year;
			})
			.ticks(16)
			.tickSizeInner(-(config.height-config.margin.top-config.margin.bottom))
		)
		.attr('transform', `translate(0,${config.height - config.margin.bottom})`)
		


	config.svg.append("text")
		.style("text-anchor", "middle")
		.attr("x", config.width / 2)
		.attr("y", config.height - (config.margin.bottom/8))
		.text("Date Archived");
		

	const yScale = d3.scaleLinear()
		.domain([0,d3.max(data, d => Number(d[config.attr]))]).nice()
		.range([config.height - config.margin.bottom, config.margin.top])
		

	// Y-Axis
	config.svg.append('g')
		.call(d3.axisLeft(yScale))
		.attr('transform', `translate(${config.margin.left},0)`)

	// Y-Axis Label
	config.svg.append("text")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.attr("y", 3 * config.margin.left / 8)
		.attr("x", -config.height/2 + config.margin.bottom/2)
		.text(field2label[config.attr])

	config.svg.datum(data)
		.append("path")
		.style("stroke-dasharray", ("3, 3"))
	    .attr("fill", "none")
	    .attr("stroke", "steelblue")
	    .attr("stroke-width", 1.5)
	    .attr("d", d3.line()
	        .x(d => config.xScale(new Date(Number(d.Year), (d.Phase == "A" ? 0 : 6), 1)))
	        .y(d => yScale(d[config.attr]))
	    )

	config.svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d => config.xScale(new Date(Number(d.Year), (d.Phase == "A" ? 0 : 6), 1)))
		.attr('cy', d => yScale(d[config.attr]))
		.attr('r', 5)
		.attr('fill', 'purple')
		.attr('class', 'versionPoint')
		.on('mouseover', showPolicyTip)
		.on('mouseout', hideToolTip)
		.on('click', updatePolicy)  
		
	config.svg.selectAll('event_triangle')
		.data(events)
		.enter()
		.append('path')
		.attr("d", d3.symbol().type(d3.symbolTriangle))
		.attr('fill', 'red')
		.attr("transform", d=> `translate(${getXCoord(d)}, ${getYCoord(d)})`)
		.on('mouseover', showEventTip)
		.on('mouseout', hideToolTip);

	// Update the plain text description to reflect the selected field
	let descField = document.getElementById("fieldDesc");
	descField.innerText = field2desc[config.attr];
}

function getXCoord(d){
	return config.xScale(new Date(Number(d.Year), Number(d.Month), Number(d.Day)));
}

function getYCoord(d){
	let points = document.getElementsByClassName("versionPoint");
	let left = [config.xScale(config.startDate), config.xScale(0)];
	let right = [config.xScale(config.endDate), config.xScale(0)];
	let target = getXCoord(d);
	for (let i = 0; i < points.length; i++) { 
		let p = points[i];
		let p_x = Number(p.getAttribute("cx"));
		let p_y = Number(p.getAttribute("cy"));
		if (p_x <= target && p_x > left[0]){
			left = [p_x, p_y];
		}
		else if (p_x >= target && p_x < right[0]){
			right = [p_x, p_y];
		}
	}
	let m = (right[1] - left[1]) / (right[0] - left[0]);
	let yCoord = (m * (target - left[0])) + left[1];
	return yCoord;
}

function showPolicyTip(ev, d){
	let data = d[config.attr];
	let version = d.Year + d.Phase;
	let html = version + "<br>" + data;
	showToolTip(ev, html);	
}

function showEventTip(ev, d){
	let date = (Number(d.Month)+1) + "/" + d.Day + "/" + d.Year.toString().substring(2);
	let html = "<div>" + date + "</div>";
	showToolTip(ev, html);
}

function updatePolicy(ev, d){
	var version = + d.Year + d.Phase;
	loadPolicy(version);
	document.getElementById('versionSelect').value = d.Year + d.Phase;
	var checkbox = document.querySelector("input[name=showChanges]");
	checkbox.checked = false;
	//scroll(0,0); //returns user to the top of the page
}



export{
    statsMain
}