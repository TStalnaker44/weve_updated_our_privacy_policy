
// Code modified from https://www.w3schools.com/howto/howto_html_include.asp
function loadPolicy(file){
    elmnt = document.getElementById("documentReader");
    xhttp = new XMLHttpRequest();
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

loadPolicy("facebook_test.html");
//document.getElementById("documentReader").innerHTML = "facebook_test.html";
