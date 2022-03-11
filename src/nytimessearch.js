//import * as d3 from 'd3';
import {getYFromDate, showEventDate, hideEventDate} from "./timeline.js"
//code modified from https://www.delftstack.com/howto/javascript/load-json-file-in-javascript/
//inspiration from https://www.youtube.com/watch?v=IMne3LY4bks&t=642s
//I wonder if we should look into p5? 
var url='https://api.nytimes.com/svc/search/v2/articlesearch.json?q=privacy&api-key=YDiZqZ5c1LcKAwUTRDJYXoSzIR8KVmj9'
function setURL( dateStart,  dateEnd,topic){
    console.log((topic));
    console.log((dateStart));
    console.log((dateEnd));
    
        url='https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+(topic)+'&begin_date='+(dateStart)+'&end_date='+(dateEnd)+'&api-key=YDiZqZ5c1LcKAwUTRDJYXoSzIR8KVmj9'
}
function getArticles(){
    fetch(url)
    .then(response => {
    return response.json();
    })
    //.then(jsondata => console.log(jsondata))
    .then(jsondata=>{
        console.log(jsondata);
        jsondata.response.docs.forEach(Article=>{
            console.log(Article.web_url)
            console.log(Article.pub_date)
        })
    })
}

export{
    getArticles, setURL
}