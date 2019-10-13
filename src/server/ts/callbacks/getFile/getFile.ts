import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';
import Express from 'express';
import {getCommandParams} from '../getCommandParams';
import {getFormattedFile} from './getFormattedFile';

const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile
export const getFile = (request: Express.Request, response: Express.Response) => {
	const pathToFile = path.join(pathToRepos, request.params['repositoryId']);
	fs.access(pathToFile, err => { //Проверка пути к файлу
		if(err) {
			response.status(404).send(pathToFile + ' not found');
		}
		else {
			let out = '';
			const gitBlob = spawn('git', getCommandParams(request, 'getFile'), {cwd: pathToFile});
			gitBlob.stdout.on('data', chunk => {
				out += chunk.toString();
			});
			gitBlob.on('error', (err) => {
				throw err;
			});
			gitBlob.on('close', () => {
				if(!out) { //Проверка существования ветки или хэша коммита
					response.status(404).send(request.params['commitHash'] + ' not found');
				}
				else {
					response.json(getFormattedFile(out)); 
				}
			});
		}
	});
};