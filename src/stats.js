
import * as d3 from 'd3';

let config = {
	svg: d3.select('#stats'),
	height: document.getElementById('stats').clientHeight,
	width: document.getElementById('stats').clientWidth,
	attr: "ReadingTime",
	margin:  {left:60, top:10, right:10, bottom:40}
}
let data = []

async function statsMain(){
	await getData();
	prepareSelector();
	getStats();
}

async function getData(){
	await d3.csv('facebook_data.csv').then(d => {
		data = d;
	}) 
}

function prepareSelector(){
    let selector = document.getElementById("fieldSelect");
	data.columns.slice(2).forEach(el => {
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

	const xScale = d3.scaleTime()
		.domain([new Date("2005-01-01"), new Date("2020-01-01")])
		.range([config.margin.left, config.width - config.margin.right])

	config.svg.append('g')
		.call(d3.axisBottom(xScale)
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
		//.attr("y", margin.left / 3)
		//.attr("x", -margin.bottom)
		//.text("Reading Time in Seconds");
		.text(config.attr)

	config.svg.datum(data)
		.append("path")
		.style("stroke-dasharray", ("3, 3"))
	    .attr("fill", "none")
	    .attr("stroke", "steelblue")
	    .attr("stroke-width", 1.5)
	    .attr("d", d3.line()
	        .x(d => xScale(new Date(Number(d.Year), (d.Phase == "A" ? 0 : 6), 1)))
	        .y(d => yScale(d[config.attr]))
	    )

	config.svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('cx', d => xScale(new Date(Number(d.Year), (d.Phase == "A" ? 0 : 6), 1)))
		.attr('cy', d => yScale(d[config.attr]))
		.attr('r', 5)
		.attr('fill', 'purple')
		.on('mouseover', showDataPoint)
		.on('mouseout', hideDataPoint)    
		
}

function showDataPoint(ev, d){
	let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
	let data = d[config.attr];
	let version = d.Year + d.Phase;
	hover.innerHTML = "<div>" + data + "</div>";
}

function hideDataPoint(){
	document.getElementById("eventHover").style.display = "none";
}

export{
    statsMain
}