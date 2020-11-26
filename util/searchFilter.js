/* See https://www.belter.io/eleventy-search */

const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // The fields we'd like to include in our index
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("subtitle");
    this.setRef("id");
  });

  // Iterate and add items to the index
  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      subtitle: page.template.frontMatter.data.subtitle,
    });
  });

  return index.toJSON();
};
