import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';
import Express from 'express';
import {getCommandParams} from '../getCommandParams';
import {getInitialData, getFullData} from './getRepositoryData';
const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repoID(/tree/:commitHash/:path)
export const getRepository = (request: Express.Request, response: Express.Response) => {
	const commitHash = request.params['commitHash'] ? request.params['commitHash'] : 'master';
	const pathToRepo = path.join(pathToRepos, request.params['repoID']);
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			const pathToDir = request.params['path'] ? path.join(pathToRepo, request.params['path']) : pathToRepo;
			fs.access(pathToDir, err => { //Проверка пути к папке (если есть)
				if(err) {
					response.status(404).send(pathToDir + ' not found');
				}
				else {
					let out = '';
					const gitTree = spawn('git', getCommandParams(request, 'getRepository'), {cwd: pathToRepo});
					gitTree.stdout.on('data', chunk => {
						out += chunk.toString();
					});
					gitTree.on('error', (err) => {
						throw err;
					});
					gitTree.on('close', () => {
						if (!out) {//Проверка существования ветки или хэша коммита
							response.status(404).send(commitHash + ' not found');
						}
						else {
							let promises: Promise<unknown>[] = [];
							getInitialData(out).forEach(obj => { //Создание промисов на каждый элемент массива, запрашивающих дополнительные данные
								const promise = new Promise (function (resolve) {
									let out = '';
									const commitInfo = spawn ('git', ['log', '-1', commitHash, '--', obj.name], {cwd: pathToDir});
									commitInfo.stdout.on('data', chunk => {
										out += chunk.toString();
									});
									commitInfo.on('close', () => {
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
			})
		}
	});
};