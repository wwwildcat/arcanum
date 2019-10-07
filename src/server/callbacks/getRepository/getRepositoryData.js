exports.getInitialData = function (out) {
	const strings = out.split(/\n./);
	const objects = strings.map(obj => ({
		'name': obj.match(/(?<=\t).*/)[0],
		'type': obj.match(/(?<=\s)\S*/)[0]
	}));
	return objects;
};

exports.getFullData = out => ({
	'hash': out.match(/(?<=commit )\S{6}/)[0],
	'message': out.match(/(?<=\n\n).*/)[0].trim(),
	'commiter': out.match(/(?<=Author:).*(?=<)/)[0].trim(),
	'date': out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
});