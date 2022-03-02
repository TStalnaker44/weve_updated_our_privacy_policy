
import * as d3 from 'd3';

import {getYFromDate} from "./timeline.js"

async function getStats(){

	const svg = d3.select('#stats')

	const height = document.getElementById('stats').clientHeight
	const width = document.getElementById('stats').clientWidth

	console.log(height)

	let data = []
	await d3.csv('mockup_data.csv').then(d => {
		data = d;
	}) 

	const margin = {left:30, top:10, right:10, bottom:20}

	//const xScale = d3.scaleLinear()
	//	.domain(d3.extent(data.map(d => d.x)))
	//	.range([margin.left, width-margin.right])

	const xScale = d3.scaleTime()
		.domain([new Date("2005-01-01"), new Date("2020-01-01")])
		.range([margin.left, width-margin.right])

	console.log(height-margin.bottom)
	svg.append('g')
		.call(d3.axisBottom(xScale)
			.tickFormat(function(date){
				let month = date.toLocaleString('en-US', {month: 'short'})
				let year = String(date.getFullYear()).substring(2)
				return month + " '" + year;
			})
		.ticks(16)
		)
		.attr('transform', `translate(0,${height - margin.bottom})`)
		

	const yScale = d3.scaleLinear()
		.domain(d3.extent(data.map(d => d.ReadingTime)))
		.range([height - margin.bottom, margin.top])
		

	svg.append('g')
		.call(d3.axisLeft(yScale))
		.attr('transform', `translate(${margin.left},0)`)

	console.log(yScale(10))

	svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
			.attr('cx', d => xScale(new Date(Number(d.Year), Number(1), Number(d.Day))))
			.attr('cy', d => yScale(d.ReadingTime))
			.attr('r', 5)
			.attr('fill', 'purple')

    // let data = []
	// await d3.csv('mockup_data.csv').then(d => {
	// 	data = d;
	// }) 

	// // https://observablehq.com/@d3/d3-scalelinear

	// let svgWidth = document.getElementById("stats").clientWidth;
    // // let xScale = d3.scaleLinear()
	// // 	.domain([0,1400])
	// // 	.range([0, svgWidth])

	// let xScale = d3.scaleLinear()
	// 	.range([new Date("2000-01-01 00:00:00"), new Date("2020-01-01 00:00:00")])


	// let yScale = d3.scaleLinear()
	// 	.domain(d3.extent(data, d => d.ReadingTime)).nice()
	// 	.range([300, 0])

    // let leftAxisG = d3.select('#stats').append('g')
	// 	.attr('id', 'left-axis')
	// 	.attr('transform', 'translate(30, 30)')
	// let bottomAxisG = d3.select('#stats').append('g')
	// 	.attr('id', 'bottom-axis')
	// 	//.attr('transform', 'translate(30, 270)')

    // let bottomAxis = d3.axisBottom(xScale)
	// bottomAxisG.call(bottomAxis)

	// let leftAxis = d3.axisLeft(yScale)
	// leftAxisG.call(leftAxis)
		
    // // Add data points to visualization (The points are upside down....)
    // d3.select('#stats')
    //         .selectAll('stat_dot')
    //         .data(data)
    //         .enter()
    //         .append('circle')
    //         .attr('r', 3)
    //         .attr('fill', 'green')
    //         .attr('cx', d => getYFromDate(d))
    //         .attr('cy', d => yScale(Number(d.ReadingTime)))
    //         .on('mouseover', showDataPoint)
    //         .on('mouseout', hideDataPoint)
	
	// console.log(yScale(Number(214)))

    // // Add lines connecting data points
    // d3.select("#stats")
    //     .datum(data)
    //     .append("path")
    //     .attr("fill", "none")
    //     .attr("stroke", "steelblue")
    //     .attr("stroke-width", 1.5)
    //     .attr("d", d3.line()
    //         .x(d=>getYFromDate(d))
    //         .y(d=>yScale(d.ReadingTime))
    //     )
        
}

function showDataPoint(ev, d){
	let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
	let data = d.ReadingTime;
	hover.innerHTML = "<div>" + data + "</div>";
}

function hideDataPoint(){
	document.getElementById("eventHover").style.display = "none";
}

export{
    getStats
}