module.exports = function (request, type) {
	let commitHash = request.params['commitHash'] ? request.params['commitHash'] : 'master';
	let pathParam = commitHash;
	let params = [];
	if (request.params['path']) { 
		pathParam += ':' + request.params['path'];
	}
	else if (request.params['pathToFile']) {
		pathParam += ':' + request.params['pathToFile'];
	}
	if (type === 'getRepository') {
		params = ['ls-tree', pathParam];
	}
	else if (type === 'getDiff') {
		params = ['diff', commitHash + '~', commitHash];
	}
	else if (type === 'getFile') {
		params = ['show', pathParam];
	}
	return params;
}