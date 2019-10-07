module.exports = function (out) {
	const modifiedFiles = out.split(/\s(?=diff --git)/);
	const diffJSON = modifiedFiles.map(file => {
		const changeHunks = file.match(/@@.*/s)[0].split(/\s(?=@@.*@@)/);
		const changeHunksJSON = changeHunks.map(hunk => ({
			'range': hunk.match(/(?<=@@)[^@]*/)[0].trim(),
			'lines': hunk.match(/(?<=@@.*@@).*/s)[0]
		}));
		return {
			'pathToFile': file.match(/(?<=\+\+\+ b\/).*/)[0],
			'changeHunks': changeHunksJSON
		};
	});
	return diffJSON;
}