window.onkeyup = keyup;
var inputTextValue;
var url;

function keyup(e) {
  inputTextValue = e.target.value;

  if(e.keyCode == 13) {
    var replaceSpaces = inputTextValue.replace(' ', '%20');
    console.log(replaceSpaces);
    url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + replaceSpaces + "&utf8=";
    getRequest();
  }
}

// AJAX Request to MediaWiki API
function getRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log(this);
    }
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}

// https://en.wikipedia.org/w/api.php?action=query&format=jsonfm&list=search&origin=*&errorformat=plaintext&srsearch=Albert%20Einstein&utf8=
