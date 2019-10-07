const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const getFormattedDiff = require('./getFormattedDiff');
const getParams = require('../getCommandParams');

const pathToRepos = process.argv[2];

//Ручка GET /api/repos/:repositoryId/commits/:commitHash/diff
module.exports = function (request, response) {
	const pathToRepo = path.join(pathToRepos, request.params['repositoryId']);
	fs.access(pathToRepo, err => { //Проверка пути к репозиторию
		if(err) {
			response.status(404).send(pathToRepo + ' not found');
		}
		else {
			let out = '';
			const gitDiff = spawn('git', getParams(request, 'getDiff'), {cwd: pathToRepo});
			gitDiff.stdout.on('data', chunk => {
				out += chunk.toString();
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