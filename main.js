window.onkeyup = keyup;
var inputTextValue;
var url;

function keyup(e) {
  inputTextValue = e.target.value;

  if(e.keyCode == 13) {
    var replaceSpaces = encodeURIComponent(inputTextValue.replace(' ', '%20'));
    url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + replaceSpaces + "&utf8=";
    getRequest();
  }
}

// AJAX Request to MediaWiki API
function getRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var parsed = JSON.parse(this.responseText);
      console.log(parsed);
      console.log(parsed.query.search[0]);

      for(var i = 0; i < 10; i++) {
        console.log(parsed.query.search[i]);
      }
    }
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}
