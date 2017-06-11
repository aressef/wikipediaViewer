
// AJAX Request to WikiMedia
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    console.log(this);
  }
}
xhttp.open("GET", "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&errorformat=plaintext&prop=revisions&titles=Main+Page&rvprop=content", true);
xhttp.send();
