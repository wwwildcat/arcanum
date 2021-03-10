import fs from 'fs';
import path from 'path';
import Express from 'express';

const pathToRepos = process.argv[2];

//Вспомогательная функция для удаления непустой директории
const deleteDir = (pathToDir: string) => {
	fs.readdirSync(pathToDir).forEach(item => {
		const pathToItem = path.resolve(pathToDir, item);
		if (fs.statSync(pathToItem).isFile()) {
			fs.unlinkSync(pathToItem);
		}
		else {
			deleteDir(pathToItem);
		}
	});
	fs.rmdirSync(pathToDir);
};
//Ручка DELETE /api/repos/:repoID
export const deleteRepository = (request: Express.Request, response: Express.Response) => {
	const pathToRepo = path.join(pathToRepos, request.params['repoID']);
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			deleteDir(pathToRepo);
			response.send(request.params['repoID'] + ' has been deleted succesfully');
		}
	});
};