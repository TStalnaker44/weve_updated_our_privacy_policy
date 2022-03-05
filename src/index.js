
import {app} from "./timeline.js"
import {getEvents} from "./eventsbar.js"
import {loadPolicy} from "./policyselector"
import {statsMain} from "./stats.js"

loadPolicy("example_policies/2019B.html");
app();
getEvents();
statsMain();
