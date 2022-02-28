
import * as d3 from 'd3';

import {getYFromDate} from "./timeline.js"

function getStats(){

    

	d3.csv("mockup_data.csv").then(data =>{
		
        d3.select('#stats')
                .selectAll('stat_dot')
                .data(data)
                .enter()
                .append('circle')
                .attr('r', 3)
                .attr('fill', 'green')
                .attr('cx', d => getYFromDate(d))
                .attr('cy', d => d.ReadingTime / 5)

        d3.select("#stats")
            .datum(data)
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d=>getYFromDate(d))
                .y(d=>d.ReadingTime/5)
            )
    });

        
}

export{
    getStats
}