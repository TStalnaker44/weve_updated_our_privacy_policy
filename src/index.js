
import {app} from "./timeline.js"
import {addEvent, getEvents} from "./eventsbar.js"
import {main, loadPolicy} from "./policyselector"
import {statsMain} from "./stats.js"

loadPolicy("facebookAdditions.html");//"facebook_test.html");
app();
getEvents();
statsMain();
main();
