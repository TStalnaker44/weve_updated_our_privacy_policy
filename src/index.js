

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

import { Octokit } from "@octokit/rest";
import {app} from "./timeline.js"
import {addEvent, getEvents} from "./eventsbar.js"

const octokit = new Octokit({
  userAgent: 'wuopp-viewer v1.0.0'
});

//adapted from https://codelounge.dev/getting-started-with-the-githubs-rest-api

const owner = 'nwintersgill'
//const owner = 'citp'
const repo = 'privacy-policy-historical'
const filepath = 'f/fa/fac/facebook.com.md';

//const owner = 'TStalnaker44';
//const repo = 'weve_updated_our_privacy_policy'
//const filepath = 'facebook_timestamps.csv';

const url =  '/repos/{owner}/{repo}/{path}'; // path to this repository via the API

/**
 * Retrieves contents of a file from Github
 * @param {*} fpath path to the desired file in the repo
 * @returns the text of the specified file
 */
const getFileContent = async (fpath) => {
  //retrieve encoded contents of file in `path` from GitHub
  const { data } = await octokit.repos.getContent({
      owner: owner,
      repo: repo,
      path: fpath
  });
  //decode the text
  let encoded = data.content;
  let decoded = atob(encoded); //TODO: replace with up-to-date method
  return decoded;
}

/**
 * Sets the reader to display a specified file from GitHub
 * @param {*} fpath path to the desired file in the repo
 */
const setReaderContent = async (fpath) => {
  let elmnt = document.getElementById("documentReader");
  let text = await getFileContent(fpath);
  elmnt.innerHTML = text;
}

/**
 * Gets the dates of each commit to the specified file 
 * @param {*} fpath path to the desired file in the repo
 * @returns an array containing JSON objects of all the dates
 */
const getCommitDates = async (fpath) => {
  const { data } = await octokit.rest.repos.listCommits({
    owner: owner,
    repo: repo,
    path: fpath
  });
  let checkpoints = new Array();
  for (let i in data)
  {
    let raw = data[i].commit.author.date.slice(0,10).split('-');
    let date = {
      year: raw[0],
      month: raw[1],
      day: raw[2]
    };
    checkpoints.push(date);
  }
  return checkpoints;
}

setReaderContent(filepath);
let dates = getCommitDates(filepath);

app(dates)

let e = {link: "https://www.google.com", image: "images/event_image.jpg", desc: "Hi there partner"}
getEvents();

