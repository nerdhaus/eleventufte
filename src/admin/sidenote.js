CMS.registerEditorComponent({
  id: "sidenote",
  // Visible label
  label: "Sidenote",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    { name: "id", label: "ID", widget: "string", required: false, hint: "If an ID is specified, an accompanying marker should be placed in the text." },
    { name: "margin", label: "Hide Reference", widget: "boolean", required: false, hint: "Display as a margin note unconnected to the main text" },
    { name: "content", label: "Sidenote content", widget: "text", minimal: true, buttons: ['bold', 'italic', 'link'], editor_components: [] },
  ],
  
  // Pattern to identify a block as being an instance of this component
  pattern: /(\[\^([0-9a-zA-Z]*)]:(?:\s*)?({-})?(?: *)?(\S.*)|\[\^ ({-})?(?: *)?(\S.*)])/,
  
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    if (match[2]) {
      // An ID was given, e.g. `[^1]: This`
			return {
				id: match[2],
				margin: match[3],
				content: match[4]
			};
    } else {
      // Inline referenceless version, e.g. `[^ This]`
			return {
				id: false,
				margin: match[5],
				content: match[6]
			};
    }
  },

  toBlock: function (obj) {
		if (obj.id) {
			return '[^' + obj.id + ']: ' + (obj.margin ? '{-} ' : '') + obj.content;
		} else {
			return '[^ ' + (obj.margin ? '{-} ' : '') + obj.content + ']';
		}
	},
	
	// Probably want to replace this with something fancier in the future
  toPreview: function (obj) {
		if (obj.id) {
			return '[^' + obj.id + ']: ' + (obj.margin ? '{-} ' : '') + obj.content;
		} else {
			return '[^ ' + (obj.margin ? '{-} ' : '') + obj.content + ']';
		}
	},
});
