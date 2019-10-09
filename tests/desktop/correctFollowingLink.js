const assert = require('chai').assert;

describe('После перехода по ссылке из списка файлов', function () {
	it('в шапке отображается название репозитория', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		return this.browser
			.url('/' + repositoryID + '/tree/master/' + pathToDir)
			.waitForExist('.Table-Cell_content_name', 2000)
			.click('.Table-Cell_content_name')
			.pause(500)
			.getText('.RepoList-CurrentRepo')
			.then(function (text) {
				assert.equal(text, 'Repository ' + repositoryID);
			});
	});
	it('хлебные крошки показывают путь к папке', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		const URL = '/' + repositoryID + '/tree/master/' + pathToDir;
		const nextObject = await this.browser
			.url(URL)
			.waitForExist('.Table-Cell_content_name', 2000)
			.getText('.Table-Cell_content_name');
		const fullPath = [].concat(repositoryID, pathToDir.split('/'), nextObject[0]);
		return this.browser
			.url(URL)
			.waitForExist('.Table-Cell_content_name', 2000)
			.click('.Table-Cell_content_name')
			.pause(500)
			.getText('.BreadCrumbs')
			.then(function (text) {
				assert.equal(text, fullPath.join(' / '));
			});
	});
	it('название текущего объекта совпадает с именем папки или файла', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		const URL = '/' + repositoryID + '/tree/master/' + pathToDir;
		const nextObject = await this.browser
			.url(URL)
			.waitForExist('.Table-Cell_content_name', 2000)
			.getText('.Table-Cell_content_name');
		return this.browser
			.url(URL)
			.waitForExist('.Table-Cell_content_name', 2000)
			.click('.Table-Cell_content_name')
			.pause(500)
			.getText('.Current-ObjectName')
			.then(function (text) {
				assert.equal(text, nextObject[0]);
			});
	});
	it('отображается структура подпапки или содержимое файла', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToDir = await this.browser.getMeta('pathToDir');
		return this.browser
			.url('/' + repositoryID + '/tree/master/' + pathToDir)
			.waitForExist('.Table-Cell_content_name', 2000)
			.click('.Table-Cell_content_name')
			.pause(500)
			.getText('.Tabs ~ div')
			.then(function (text) {
				assert.isOk(text, 'Таблица или файл не отображаются');
			})
			.assertView('linkContent', '.Tabs ~ div');
	});
});

describe('После перехода по ссылке в хлебных крошках', function () {
	it('в шапке отображается название репозитория', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		return this.browser
			.url('/' + repositoryID + '/blob/master/' + pathToFile)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.click('.BreadCrumbs-Item')
			.pause(500)
			.getText('.RepoList-CurrentRepo')
			.then(function (text) {
				assert.equal(text, 'Repository ' + repositoryID);
			});
	});
	it('хлебные крошки показывают путь к папке', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		const URL = '/' + repositoryID + '/blob/master/' + pathToFile;
		const nextObject = await this.browser
			.url(URL)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.getText('.BreadCrumbs-Item');
		return this.browser
			.url(URL)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.click('.BreadCrumbs-Item')
			.pause(500)
			.getText('.BreadCrumbs')
			.then(function (text) {
				assert.equal(text, nextObject[0].slice(0, nextObject[0].length - 2));
			});
	});
	it('название текущего объекта совпадает с именем папки', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		const URL = '/' + repositoryID + '/blob/master/' + pathToFile;
		const nextObject = await this.browser
			.url(URL)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.getText('.BreadCrumbs-Item');
		return this.browser
			.url(URL)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.click('.BreadCrumbs-Item')
			.pause(500)
			.getText('.Current-ObjectName')
			.then(function (text) {
				assert.equal(text, nextObject[0].slice(0, nextObject[0].length - 2));
			});
	});
	it('в таблице отображается структура папки', async function () {
		const repositoryID = await this.browser.getMeta('repositoryID');
		const pathToFile = await this.browser.getMeta('pathToFile');
		return this.browser
			.url('/' + repositoryID + '/blob/master/' + pathToFile)
			.waitForExist('.BreadCrumbs-Item', 2000)
			.click('.BreadCrumbs-Item')
			.pause(500)
			.getText('.Table')
			.then(function (text) {
				assert.isOk(text, 'Таблица пуста');
			})
			.assertView('tableBack', '.Table');
	});
});