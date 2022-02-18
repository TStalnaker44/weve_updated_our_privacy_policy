import * as d3 from 'd3';
function addURL(){
  let eventsbar=document.getElementById('eventsBar');
  console.log("hello world");
  eventsbar.appendChild(document.createTextNode('wm.edu'));
  eventsbar.setAttribute("style", "background:green");
  //d3.select('eventsBar').append('URL').createTextNode("wddm.edu");

}
function getURL(d){
	return d.URLs;
}
function addManyURLs(){
  d3.dsv(" ","testURLs.csv").then(data=>{
	//var URLarray = data;
	//console.log(URLarray);
	console.log(data.URLs);
	//console.log(String(URLarray[1].URLs));
	data.forEach(element => {
		d3.select('#eventsBar')
			
			.append('div')
			.text(element.URLs)
	});
	console.log("adding urls");
	//   d3.select('#eventsBar')
	// 		.style("background", "green")
	// 		.data(data)
	// 			.enter()
	// 			.append('div')
	// 			.text(function(d){
	// 				return d;
	// 			  })
		d3.select('#eventsBar')
			
			.append('div')
			.text("hello")
  }
	)

}
export{
  addURL,addManyURLs
}