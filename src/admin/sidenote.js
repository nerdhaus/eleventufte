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
  
  /*
		This regex parses out the notes-containing portions of all tufte-markdown
		(https://github.com/luhmann/tufte-markdown/tree/master/packages/remark-sidenotes/src)
		flavored sidenotes and margin-notes:

			[^1]: Referenced sidenote
			[^1]: Referenced sidenotes w/markdown `![Image Alt](image.jpg Title Text)`
			[^1]: Referenced sidenotes with multi-line contents, as long as each line is
			  indented by at least two spaces
			[^1]: {-} Margin-note variations of the above formats

			[^ Inline sidenote]
			[^ {-} Inline margin-note]

			Text with[^ multiple] inline side and margin notes[^{-} in one paragraph] as well.
		
    Nested markdown inside an inline footnote breaks atm; EMCAScript regexes don't support 
    balancing or lookaheads, which makes any nested markdown… fussy. Going greedy makes
    the match below work, but breaks multiple simpler inlines inside a single paragraph,
    which feels like a better scenario to optimize for ATM.
    
			[^ Like so: `![Image Alt](image.jpg Title Text)`]      <-- Breaks ATM
			[^ {-} Like so: `![Image Alt](image.jpg Title Text)`]   <-- Breaks ATM
    
		Due to the way the pattern works, referenced side/margin note results appear in match
		results 1, 2, and 3 while inline side and margin-notes appear in matches 4 and 5.
		If we were using PCRE we could get fancier and use duplicated named groups, but that
		is not our lot in life; ECMA regexes don't support the (?J) directive to allow
		duplicate named groups. Alas.
   */
   
  pattern: /\[\^([[0-9a-zA-Z]*)]:(?:\s*)({-})?(?: *)?(\S(?:.|(?:\n {2,}))*)|\[\^\s({-})?(?: *)(\S[^\]]*)]/,
  
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    if (match[1]) {
      // An ID was given, e.g. `[^1]: This`
			return {
				id: match[1],
				margin: match[2],
				content: match[3]
			};
    } else {
      // Inline referenceless version, e.g. `[^ This]`
			return {
				id: false,
				margin: match[4],
				content: match[5]
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
