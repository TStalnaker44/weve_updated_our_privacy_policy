
import {app} from "./timeline.js"
import {getEvents} from "./eventsbar.js"
import {loadPolicy} from "./policyselector"
import {statsMain} from "./stats.js"
import {autocomplete} from "./searchBar"

loadPolicy("example_policies/2019B.html");
app();
getEvents();
statsMain();

let companies = ["Facebook","Instagram","Snapchat","Zoom"];
autocomplete(document.getElementById("companyInput"), companies)
