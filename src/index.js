
import {app} from "./timeline.js"
import {addEvent, getEvents} from "./eventsbar.js"
import {main, loadPolicy} from "./policyselector"
import {getStats} from "./stats.js"

loadPolicy("facebook_test.html");
app();
getEvents();
getStats();
main();
