/* We use this to convert attachments to links in the document head */

module.exports = function (files, local=false) {
	if (!Array.isArray(files)) files = Array(files)
	let items = [];
	files.forEach((item) => {
		if (x = itemToLink(item, local)) items.push(x)
	});
	return items.join("\n");
};

function itemToLink(item, local) {
	if (item.endsWith(".js")) {
		if (local) {
			return '<script src="' + item + '"></script>'
		} else {
			return '<script crossorigin="anonymous" src="' + item + '"></script>'
		}
	} else if (item.endsWith(".css")) {
		return '<link rel="stylesheet" href="' + item + '">'
	}
	return false;
}