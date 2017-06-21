window.onkeyup = keyup;
var inputTextValue;
var url;

function keyup(e) {
  inputTextValue = e.target.value;

  if(e.keyCode == 13) {
    var spacesToPercentTwenty = encodeURIComponent(inputTextValue.replace(' ', '%20'));

    urlForSearchResults = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + spacesToPercentTwenty + "&utf8=";

    getRequest();
  }
}

// AJAX Request to MediaWiki API
function getRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var parsed = JSON.parse(this.responseText);
      parsedResults = parsed.query.search;

      for(var i = 0; i < 10; i++) {
        parsed.query.search[i];
      }

      addResults();
    }
  }
  xhttp.open("GET", urlForSearchResults, true);
  xhttp.send();
}

function addResults() {
  var resultContainer = document.querySelector('.resultContainer');

  for (var i = 0; i < 10; i++) {
    var indResult = document.createElement('div');
    var indResultList = document.createElement('ul');
    var searchResultTitle = document.createElement('li');
    var searchResultSnippet = document.createElement('li');
    var searchResultURL = document.createElement('a');

    indResult.className = 'indResult';
    searchResultTitle.className = 'title';
    searchResultSnippet.className = 'snippet';

    searchResultTitle.textContent = parsedResults[i].title;
    searchResultSnippet.textContent = parsedResults[i].snippet;
    searchResultURL.textContent = 'Go to Page';
    searchResultURL.href = 'https://en.wikipedia.org/wiki/' + searchResultTitle.textContent.replaceAll(' ', '_');
    searchResultURL.target = '_blank';

    // Remove HTML tags from snippet
    var snippetText = searchResultSnippet;
    var strippedString = snippetText.textContent.replace(/(<([^>]+)>)/ig,"");
    searchResultSnippet.innerHTML = strippedString + '...';

    resultContainer.appendChild(indResult);
    indResult.appendChild(indResultList);
    indResultList.appendChild(searchResultTitle);
    indResultList.appendChild(searchResultSnippet);
    indResultList.appendChild(searchResultURL);

  }

}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
