/* See https://www.belter.io/eleventy-search */

(function (window, document) {
  "use strict";

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });

    const resEl = document.getElementById("searchResults");
    const noResultsEl = document.getElementById("noResultsFound");

    resEl.innerHTML = "";
    if (results) {
      noResultsEl.style.display = "none";

      results.map((r) => {
        const { id, title, description } = r.doc;
        const el = document.createElement("li");
        resEl.appendChild(el);

        const h3 = document.createElement("h3");
        el.appendChild(h3);

        const a = document.createElement("a");
        a.setAttribute("href", id);
        a.textContent = title;
        h3.appendChild(a);

        const p = document.createElement("p");
        p.textContent = description;
        el.appendChild(p);
      });
    } else {
      noResultsEl.style.display = "block";
    }
  };

  fetch("/assets/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      const searchField = document.getElementById("searchField");
      let query = false;
      
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      if (query = getParameterByName('q')) {
        searchField.value = query.split(/\/|-|_+/).join(' ').trim()
        search({ "target" : { "value" : searchField.value }});
      }
      searchField.addEventListener("input", search);
    })
  );
})(window, document);

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
