import express from 'express';
import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();

//Коллбэки
import {getRepos} from './callbacks/getRepos';
import {getCommits} from './callbacks/getCommits';
import {getDiff} from './callbacks/getDiff/getDiff';
import {getRepository} from './callbacks/getRepository/getRepository';
import {getRepositoryAll} from './callbacks/getRepositoryAll';
import {getFile} from './callbacks/getFile/getFile';
import {deleteRepository} from './callbacks/deleteRepository';
import {addRepository} from './callbacks/addRepository';

//Запросы
app.use(express.static(__dirname + '/pages'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
	origin: 'http://localhost:3000'
}));
//Данные с сервера
app.get('/api/repos', getRepos);

app.get('/api/repos/:repoID/commits/:commitHash', getCommits);

app.get('/api/repos/:repoID/commits/:commitHash/diff', getDiff);

app.get('/api/repos/:repoID', getRepository);

app.get('/api/repos/:repoID/all', getRepositoryAll); //Возвращает содержимое всех папок и подпапок репозитория (для поиска по файлам)

app.get('/api/repos/:repoID/tree/:commitHash/:path([^/]*)?', getRepository);

app.get('/api/repos/:repoID/blob/:commitHash/:pathToFile([^/]*)?', getFile);

app.delete('/api/repos/:repoID', deleteRepository);

app.post('/api/repos(/:repoID)?', addRepository);

app.use((request: Express.Request, response: Express.Response) => response.status(404).send('URL not found'));


app.listen(3030);