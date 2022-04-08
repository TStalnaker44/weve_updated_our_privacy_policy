import {viewerApp} from "./timeline.js"
import {getEvents} from "./eventsbar.js"
import{getArticles} from "./nytimessearch.js"
//import {loadPolicy} from "./policyselector"
import {autocomplete} from "./searchBar.js"
import {statsMain} from "./stats.js"
import {loadPolicy} from "./utils.js"
import {companies} from "./companies.js"

loadPolicy(initialPolicy);
viewerApp();
getEvents();
getArticles();
statsMain();
autocomplete(document.getElementById("companyInput"), companies)
