(function (window, document) {
  "use strict";

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });

    const resEl = document.getElementById("searchResults");

    resEl.innerHTML = "";
    if (results) {
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
    }
  };

  fetch("/assets/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById("searchField").addEventListener("input", search);
    })
  );
})(window, document);