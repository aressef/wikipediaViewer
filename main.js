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
      parsedResults = parsed.query.search;

      for(var i = 0; i < 10; i++) {
        console.log(parsed.query.search[i]);
      }
      addResults();
    }
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}

function addResults() {
  var resultList = document.querySelector('ul');

  for (var i = 0; i < 10; i++) {
    var searchResultsDiv = document.createElement('div');
    searchResultsDiv.className = 'searchResultsDiv';
    var searchResults = document.createElement('ul');
    var searchResultTitle = document.createElement('li');
    var searchResultSnippet = document.createElement('li');

    searchResultTitle.textContent = parsedResults[i].title;
    searchResultSnippet.textContent = parsedResults[i].snippet;

    // Remove HTML tags from snippet
    var snippetText = searchResultSnippet;
    var strippedString = snippetText.textContent.replace(/(<([^>]+)>)/ig,"");
    searchResultSnippet.innerHTML = strippedString;

    resultList.appendChild(searchResultsDiv);
    searchResultsDiv.appendChild(searchResults);
    searchResults.appendChild(searchResultTitle);
    searchResults.appendChild(searchResultSnippet);
  }

}
