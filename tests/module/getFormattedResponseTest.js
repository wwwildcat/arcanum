const {expect} = require('chai');
const {getInitialData, getFullData} = require('../../src/server/callbacks/getRepository/getRepositoryData');
const getFormattedFile = require('../../src/server/callbacks/getFile/getFormattedFile');

describe('getInitialData', function () {
	it('получает объекты из строки', function () {
		const out = '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n040000 tree ecf42278f59e5ae29f50114c6cf88b78a2154738\tcallbacks\n100644 blob 2c92041b9710c6e2a9e3c329fe1999279692fd6e\tindex.js\n';
		const objects = [{
			'name': '.gitignore',
			'type': 'blob'
		},
		{
			'name': 'callbacks',
			'type': 'tree'
		},
		{
			'name': 'index.js',
			'type': 'blob'
		}];
		expect(getInitialData(out)).is.eql(objects);
	});
});

describe('getFullData', function () {
	it('получает объекты из строки', function () {
		const out = 'commit e4b89cb9122596ba2bf981ec6161e2c46ac0a1f7\nAuthor: wwwildcat <wild--cat@yandex.ru>\nDate:   Sun Sep 29 01:49:43 2019 +0300\n\n    format + small fixes\n';
		const fullObject = {
			'hash': 'e4b89c',
			'message': 'format + small fixes',
			'commiter': 'wwwildcat',
			'date': 'Sun Sep 29 01:49:43 2019'
		};
		expect(getFullData(out)).is.eql(fullObject);
	});
});

describe('getFormattedFile', function () {
	it('получает массив из одной строки', function () {
		const out = 'module.exports.rules = require(\'./lib/rules/map.js\');';
		const fileLines = [
			'module.exports.rules = require(\'./lib/rules/map.js\');'
		];
		expect(getFormattedFile(out)).is.eql(fileLines);
	});
	it('получает массив строк файла', function () {
		const out = 'const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst pathToRepos = process.argv[2];\n\n//Ручка GET /api/repos\nmodule.exports = function (request, response) {\n\tlet repos = null;\n\tfs.readdir(pathToRepos, (err, items) => {\n\t\tif (err) {\n\t\t\tresponse.status(404).send(pathToRepos + \' not found\');\n\t\t} //Оставить только директории\n\t\trepos = items.filter(item => fs.statSync(path.resolve(pathToRepos, item)).isDirectory());\n\t\tresponse.json(repos);\n\t});\n};';
		const fileLines = [
			'const fs = require(\'fs\');',
			'const path = require(\'path\');',
			'',
			'const pathToRepos = process.argv[2];',
			'',
			'//Ручка GET /api/repos',
			'module.exports = function (request, response) {',
			'\tlet repos = null;',
			'\tfs.readdir(pathToRepos, (err, items) => {',
			'\t\tif (err) {',
			'\t\t\tresponse.status(404).send(pathToRepos + \' not found\');',
			'\t\t} //Оставить только директории',
			'\t\trepos = items.filter(item => fs.statSync(path.resolve(pathToRepos, item)).isDirectory());',
			'\t\tresponse.json(repos);',
			'\t});'
		];
		expect(getFormattedFile(out)).is.eql(fileLines);
	});
});