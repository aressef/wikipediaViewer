window.onkeyup = keyup;

function keyup(e) {
  inputTextValue = e.target.value;

  if(e.keyCode == 13) {
    console.log(inputTextValue);
    var spacesToPercentTwenty = encodeURIComponent(inputTextValue.replace(' ', '%'));

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
  while (resultContainer.hasChildNodes()) {
    resultContainer.removeChild(resultContainer.firstChild);
  }
  for (var i = 0; i < 10; i++) {
    var searchResultLink = document.createElement('a');
    var indResult = document.createElement('div');
    var indResultList = document.createElement('ul');
    var searchResultTitle = document.createElement('li');
    var searchResultSnippet = document.createElement('li');

    searchResultLink.className = 'searchResultLink';
    indResult.className = 'indResult';
    searchResultTitle.className = 'title';
    searchResultSnippet.className = 'snippet';

    searchResultTitle.textContent = parsedResults[i].title;
    console.log(searchResultTitle.textContent);
    searchResultSnippet.textContent = parsedResults[i].snippet;
    searchResultLink.href = 'https://en.wikipedia.org/wiki/' + searchResultTitle.textContent.replaceAll(' ', '_');
    searchResultLink.target = '_blank';

    // Remove HTML tags from snippet
    var snippetText = searchResultSnippet;
    var strippedString = snippetText.textContent.replace(/(<([^>]+)>)/ig,"");
    searchResultSnippet.innerHTML = strippedString + '...';

    resultContainer.appendChild(searchResultLink);
    searchResultLink.appendChild(indResult);
    indResult.appendChild(indResultList);
    indResultList.appendChild(searchResultTitle);
    indResultList.appendChild(searchResultSnippet);
  }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
