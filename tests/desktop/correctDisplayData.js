const assert = require('chai').assert;

describe('На странице содержимого папки', function () {
	it('в шапке отображается название репозитория', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		return this.browser
			.url('/' + repoID + '/tree/master/' + pathToDir)
			.waitForExist('.RepoList-CurrentRepo', 2000)
			.getText('.RepoList-CurrentRepo')
			.then(function (text) {
				assert.equal(text, 'Repository ' + repoID);
			});
	});
	it('хлебные крошки показывают путь к папке', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		const fullPath = [].concat(repoID, pathToDir.split('/'));
		return this.browser
			.url('/' + repoID + '/tree/master/' + pathToDir)
			.waitForExist('.BreadCrumbs', 2000)
			.getText('.BreadCrumbs')
			.then(function (text) {
				assert.equal(text, fullPath.join(' / '));
			});
	});
	it('название текущего объекта совпадает с именем папки', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		const currentDir = pathToDir.split('/').reverse()[0];
		return this.browser
			.url('/' + repoID + '/tree/master/' + pathToDir)
			.waitForExist('.Current-ObjectName', 2000)
			.getText('.Current-ObjectName')
			.then(function (text) {
				assert.equal(text, currentDir);
			});
	});
	it('в таблице отображается структура папки', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		return this.browser
			.url('/' + repoID + '/tree/master/' + pathToDir)
			.waitForExist('.Table', 2000)
			.getText('.Table')
			.then(function (text) {
				assert.isOk(text, 'Таблица пуста');
			})
			.assertView('table', '.Table');
	});
});

describe('На странице содержимого файла', function () {
	it('в шапке отображается название репозитория', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		return this.browser
			.url('/' + repoID + '/blob/master/' + pathToFile)
			.waitForExist('.RepoList-CurrentRepo', 2000)
			.getText('.RepoList-CurrentRepo')
			.then(function (text) {
				assert.equal(text, 'Repository ' + repoID);
			});
	});
	it('хлебные крошки показывают путь к файлу', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		const fullPath = [].concat(repoID, pathToFile.split('/'));
		return this.browser
			.url('/' + repoID + '/blob/master/' + pathToFile)
			.waitForExist('.BreadCrumbs', 2000)
			.getText('.BreadCrumbs')
			.then(function (text) {
				assert.equal(text, fullPath.join(' / '));
			});
	});
	it('название текущего объекта совпадает с именем файла', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		const currentFile = pathToFile.split('/').reverse()[0];
		return this.browser
			.url('/' + repoID + '/blob/master/' + pathToFile)
			.waitForExist('.Current-ObjectName', 2000)
			.getText('.Current-ObjectName')
			.then(function (text) {
				assert.equal(text, currentFile);
			});
	});
	it('в поле просмотра отображается содержимое файла', async function () {
		const repoID = await this.browser.getMeta('repoID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		return this.browser
			.url('/' + repoID + '/blob/master/' + pathToFile)
			.waitForExist('.Viewer-Content', 2000)
			.getText('.Viewer-Content')
			.then(function (text) {
				assert.isOk(text, 'Файл не отображается');
			})
			.assertView('viewer', '.Viewer');
	});
});