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
  d3.csv("testURLs.csv").then(data=>{
	  console.log(data);
	  d3.select('body')
			.selectAll('div')
			.data(data)
			.enter()
			.append('div')
			.text(function(d){
				return d;
			});
  }
	)

}
export{
  addURL,addManyURLs
}