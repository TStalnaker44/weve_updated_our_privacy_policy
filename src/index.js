

// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
function loadPolicy(file){
    let elmnt = document.getElementById("documentReader");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
      }
      return;
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    return;
}

async function getCommits(){
  //let commmits = await octokit.request('GET https://api/github.com/repos/TStalnaker44/commits?path=md2html.py')
  //let commits = 'hello';
  
  let commits = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'TStalnaker44',
    repo: 'weve_updated_our_privacy_policy'
  });
  
  console.log(commits);
  return commits;
}

import { Octokit } from "@octokit/rest";
import {
  app
} from "./timeline.js"

const octokit = new Octokit({
  userAgent: 'wuopp-viewer v1.0.0'
});

/*
let text = octokit.rest.repos.getContent({
  owner: 'TStalnaker44',
  repo: 'weve_updated_our_privacy_policy',
  path: 'md2html.py'
});

text.then(console.log(text));
*/

//adapted from https://codelounge.dev/getting-started-with-the-githubs-rest-api

const owner = 'citp'
const repo = 'privacy-policy-historical'
const filepath = 'f/fa/fac/facebook.com.md';

//const owner = 'TStalnaker44';
//const repo = 'weve_updated_our_privacy_policy'
//const filepath = 'facebook_timestamps.csv';

const url =  '/repos/{owner}/{repo}/{path}'; // leave this as is
const ref =  'heads/master'; // 'master' represents the name of my primary branch

/*
const getContents = async () => {
  const { data } = await octokit.request({
      owner,
      repo,
      url,
      method: 'GET',
      path: 'contents', // gets the whole repo
  });
  console.log(data)
}
*/

const getFileContent = async () => {
  const { data } = await octokit.repos.getContent({
      owner: owner,
      repo: repo,
      path: filepath
  });
  console.log(data);
  console.log('encoded:');
  let encoded = data.content;
  console.log(encoded);
  console.log('decoded:');
  let decoded = atob(encoded); //TODO: replace with up-to-date method
  console.log(decoded);
  
}

const getFileCommits = async () => {
  const { data } = await octokit.rest.repos.listCommits({
      owner: owner,
      repo: repo,
      path: filepath
  });
  console.log(data);
  //console.log('encoded:');
  //let encoded = data.content;
  //console.log(encoded);
  //console.log('decoded:');
  //let decoded = atob(encoded);
  //console.log(decoded);
  
}

getFileContent();
getFileCommits();
console.log('new 6');

//getCommits();
//console.log(text);


loadPolicy("facebook_test.html");
app()
// d3.csv("facebook_timestamps.csv").then(
//   data => {
//     d3.select('svg')
//     .selectAll('circle')
//     .data(data)
//     .enter()
//     .append('circle')
//     .attr('r', 5)
//     .attr('fill', 'green')
//     .attr('cx', 100)
//     .attr('cy', 100)

//     console.log("Hello");
//   }
// );
