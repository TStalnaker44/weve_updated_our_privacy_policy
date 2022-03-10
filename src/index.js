
import {app} from "./timeline.js"
import {getEvents} from "./eventsbar.js"
import {loadPolicy} from "./policyselector"
import {statsMain} from "./stats.js"
import{getArticles} from "./nytimessearch.js"

loadPolicy("example_policies/2019B.html");
app();
getEvents();
setURL(20120101,20120103,'security')
getArticles();
statsMain();
