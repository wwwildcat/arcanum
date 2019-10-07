const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repositoryId(/tree/:commitHash/:path)
module.exports = function (request, response) {
	const pathToRepo = path.join(pathToRepos, request.params['repositoryId']);
	let commitHash = 'master';
	let params = ['ls-tree', commitHash];
	if (request.params['commitHash']) { //Проверка наличия в запросе ветки или хэша коммита
		commitHash = request.params['commitHash'];
		if (request.params['path']) { //Проверка наличия в запросе дальнейшего пути
			params[1] += ':' + request.params['path'];
		}
	}
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			let out = '';
			const gitTree = spawn('git', params, {cwd: pathToRepo});
			gitTree.stdout.on('data', chunk => {
				out += chunk.toString();
			});
			gitTree.on('close', () => {
				if(!out) { //Проверка существования ветки или хэша коммита
					response.status(404).send(commitHash + ' not found');
				}
				else {
					const strings = out.split(/\n./);
					const objects = strings.map(obj => ({
						'name': obj.match(/(?<=\t).*/)[0],
						'type': obj.match(/(?<=\s)\S*/)[0]
					}));
					const pathToDir = request.params['path'] ? path.join(pathToRepo, request.params['path']) : pathToRepo; //Новый рабочий каталог для дочернего процесса
					let promises = [];
					objects.forEach(obj => { //Создание промисов на каждый элемент массива, запрашивающих дополнительные данные
						const promise = new Promise (function (resolve) {
							let out = '';
							const commitInfo = spawn ('git', ['log', '-1', obj.name], {cwd: pathToDir});
							commitInfo.stdout.on('data', chunk => {
								out += chunk.toString();
							});
							commitInfo.on('close', () => {
								const fullObject = {
									'type': obj.type,
									'name': obj.name,
									'hash': out.match(/(?<=commit )\S{6}/)[0],
									'message': out.match(/(?<=\n\n).*/)[0].trim(),
									'commiter': out.match(/(?<=Author:).*(?=<)/)[0].trim(),
									'date': out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
								};
								resolve(fullObject);
							});
						});
						promises.push(promise);
					});
					const outerPromise = Promise.all(promises);
					outerPromise.then(value => response.json(value)); //Получение данных из промисов
				}
			});
		}
	});
};