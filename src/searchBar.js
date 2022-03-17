
/*
Modified from: https://www.w3schools.com/howto/howto_js_autocomplete.asp
*/

let MAX_SUGGESTIONS = 6;

function autocomplete(input, arr){
    var currentFocus;
    input.addEventListener("input", function(e){

        var a, b, i, val = this.value;

        closeAllLists();
        if (!val){return false;}
        currentFocus = -1;

        a = document.createElement("div")
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(a);

        let suggestions = 0;
        i = 0;
        while (suggestions < MAX_SUGGESTIONS && i<arr.length){
            // Check if item starts with same letters as text field value
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
                b = document.createElement("div");
                b.innerHTML = "<strong>" + arr[i].substr(0,val.length) + "</strong>"; //bold matching characters
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e){
                    input.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
                suggestions++;
            }
            i++;
        }
    });

    input.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x){ x = x.getElementsByTagName("div")}

        // Check for down arrow press
        if (e.keyCode == 40){
            currentFocus++;
            addActive(x);
        }
        // Check for up arrow press
        else if (e.keyCode == 38){
            currentFocus--;
            addActive(x);
        }
        // Check if enter key pressed
        else if (e.keyCode == 13){
            e.preventDefault();
            if (currentFocus > -1){
                if (x) {x[currentFocus].click()}
            }
        }
    });

    function addActive(x){
        if (!x) {return false;}
        removeActive(x);
        if (currentFocus >= x.length) {currentFocus = 0;}
        if (currentFocus < 0) {currentFocus = x.length - 1;}
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x){
        for (var i=0; i<x.length; i++){
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt){
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i=0; i<x.length; i++){
            if (elmnt != x[i] && elmnt != input){
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e){
        closeAllLists(e.target);
    });
}

export{
    autocomplete
}