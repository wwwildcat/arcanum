const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const getParams = require('../getCommandParams');
const {getInitialData, getFullData} = require('./getRepositoryData');
const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repositoryId(/tree/:commitHash/:path)
module.exports =  function (request, response) {
	const commitHash = request.params['commitHash'] ? request.params['commitHash'] : 'master';
	const pathToRepo = path.join(pathToRepos, request.params['repositoryId']);
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			let out = '';
			const gitTree = spawn('git', getParams(request, 'getRepository'), {cwd: pathToRepo});
			gitTree.stdout.on('data', chunk => {
				out += chunk.toString();
			});
			gitTree.on('close', () => {
				if(!out) { //Проверка существования ветки или хэша коммита
					response.status(404).send(commitHash + ' not found');
				}
				else {
				//	const objects = getInitialData(out);
					const pathToDir = request.params['path'] ? path.join(pathToRepo, request.params['path']) : pathToRepo; //Новый рабочий каталог для дочернего процесса
					let promises = [];
					getInitialData(out).forEach(obj => { //Создание промисов на каждый элемент массива, запрашивающих дополнительные данные
						const promise = new Promise (function (resolve) {
							let out = '';
							const commitInfo = spawn ('git', ['log', '-1', obj.name], {cwd: pathToDir});
							commitInfo.stdout.on('data', chunk => {
								out += chunk.toString();
							});
							commitInfo.on('close', () => {
							//	const fullObject = Object.assign(obj, getFullData(out));
								resolve(Object.assign(obj, getFullData(out)));
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