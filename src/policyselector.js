
// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
function loadPolicy(file){
    let elmnt = document.getElementById("documentReader");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
      }
      return;
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    return;
}

function main(){
    let selector = document.getElementById("versionSelect");
    selector.addEventListener("change", function() {
        if(Number(selector.value) % 2 == 0){
            loadPolicy("facebook_test.html");
        }
        else {
            loadPolicy("facebook_2.html");
        }
    });
}

export{
    main,
    loadPolicy
}