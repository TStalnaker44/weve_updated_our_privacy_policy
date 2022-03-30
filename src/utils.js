
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
        var file = "example_policies/" + selector.value + ".html";
		loadPolicy(file);
    });
}

// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
// function loadPolicy(file){
//     let elmnt = document.getElementById("documentReader");
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//       if (this.readyState == 4) {
//         if (this.status == 200) {elmnt.innerHTML = this.responseText;}
//       }
//       return;
//     }
//     xhttp.open("GET", file, true);
//     xhttp.send();
//     return;
// }

function loadPolicy(version){
    let elmnt = document.getElementById("documentReader");
    elmnt.innerHTML = policyHTML;
}

export{
    showToolTip,
    hideToolTip,
    addSelections,
    loadPolicy
}