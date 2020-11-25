/* We use this to convert attachments to links in the document head */

module.exports = function (files, local=false) {
	let items = [];
	files.forEach((item) => {
		if (item.endsWith(".js")) {
			if (local) {
				items.push('<script src="' + item + '"></script>')
			} else {
				items.push('<script crossorigin="anonymous" src="' + item + '"></script>')
			}
		} else if (item.endsWith(".css")) {
			items.push('<link rel="stylesheet" href="' + item + '">')
		}
	});
	return items.join("\n");
};
