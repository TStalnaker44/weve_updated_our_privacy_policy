
function showToolTip(ev, html){
    let hover = document.getElementById('eventHover')
	hover.style.display = 'block';
	hover.style.left = ev.pageX + 2 + "px";
	hover.style.top = ev.pageY + 2 + "px";
    hover.innerHTML = html;
}

function hideToolTip(){
    document.getElementById("eventHover").style.display = "none";
}

function addSelections(data){
	
	let selector = document.getElementById('versionSelect');

	let i = 0;
	data.reverse().forEach(el => {
		let option = document.createElement("option");
		option.setAttribute("value", el.Year + el.Phase); //This can eventually be the commit id
		option.innerHTML = el.Year + el.Phase;
		selector.appendChild(option);
		i += 1;
	});

	selector.addEventListener("change", function() {
		var version = selector.value;
		var checkbox = document.querySelector("input[name=showChanges]");
		checkbox.checked = false;
		loadPolicy(version);
    });
}

function loadCompany(companyName){
	document.location.href = "?company=" + companyName;
}

// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
function loadPolicy(version, changes="false"){
    let elmnt = document.getElementById("documentReader");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
      }
      return;
    }
	let f = "/viewer/policy?version=" + version + "&changes=" + changes;
	xhttp.open("GET", f, true);
    xhttp.send();
    return;
}

var checkbox = document.querySelector("input[name=showChanges]");

checkbox.addEventListener('change', function() {
	let selector = document.getElementById('versionSelect');
	var version = selector.value;
	if (this.checked) {
		console.log("Checkbox is checked..");
		loadPolicy(version, "true");
	} else {
		console.log("Checkbox is not checked..");
		loadPolicy(version, "false");
	}
});

export{
    showToolTip,
    hideToolTip,
    addSelections,
    loadPolicy,
	loadCompany
}