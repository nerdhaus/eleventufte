const configureParser = require('@tufte-markdown/parser')
const parse = configureParser({ react: false })

module.exports = {
  render: function(text, wrap = true) {
    let tmp = parse(text)
    if (wrap && (tmp.indexOf("<section>") == -1)) {
       return ('<section>' + tmp + '</section>');
    }
    else {
      return tmp;
    }
  },
  
  renderInline: function(text) {
		return parse(String(text)).replace('<p>', '').replace('</p>', '');
  }
}