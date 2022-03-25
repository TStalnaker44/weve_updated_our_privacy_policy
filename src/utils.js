
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

export{
    showToolTip,
    hideToolTip
}