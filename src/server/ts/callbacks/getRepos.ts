import fs from 'fs';
import path from 'path';
import Express from 'express';

const pathToRepos = process.argv[2];

//Ручка GET /api/repos
export const getRepos = (request: Express.Request, response: Express.Response) => {
	let repos = null;
	fs.readdir(pathToRepos, (err, items) => {
		if (err) {
			response.status(404).send(pathToRepos + ' not found');
		} //Оставить только директории
		repos = items.filter(item => fs.statSync(path.resolve(pathToRepos, item)).isDirectory());
		response.json(repos);
	});
};