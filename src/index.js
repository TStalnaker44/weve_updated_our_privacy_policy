
//import {app} from "./timeline.js"
import {getEvents} from "./eventsbar.js"
import {loadPolicy} from "./utils"
import {statsMain} from "./stats.js"
import {autocomplete} from "./searchBar"
import {companies} from "./companies.js"

loadPolicy("example_policies/2019B.html");
//app();
getEvents();
statsMain();
autocomplete(document.getElementById("companyInput"), companies)
