import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';
import Express from 'express';
import {getFormattedDiff} from './getFormattedDiff';
import {getCommandParams} from '../getCommandParams';

const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repositoryId/commits/:commitHash/diff
export const getDiff = (request: Express.Request, response: Express.Response) => {
	const pathToRepo = path.join(pathToRepos, request.params['repositoryId']);
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			let out = '';
			const gitDiff = spawn('git', getCommandParams(request, 'getDiff'), {cwd: pathToRepo});
			gitDiff.stdout.on('data', chunk => {
				out += chunk.toString();
			});
			gitDiff.on('error', (err) => {
				throw err;
			});
			gitDiff.on('close', () => {
				if(!out) { //Проверка существования ветки или хэша коммита
					response.status(404).send(request.params['commitHash'] + ' not found');
				}
				else {
					response.json(getFormattedDiff(out));
				}
			});
		}
	});
};