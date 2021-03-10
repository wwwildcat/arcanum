"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
//Коллбэки
var getRepos_1 = require("./callbacks/getRepos");
var getCommits_1 = require("./callbacks/getCommits");
var getDiff_1 = require("./callbacks/getDiff/getDiff");
var getRepository_1 = require("./callbacks/getRepository/getRepository");
var getRepositoryAll_1 = require("./callbacks/getRepositoryAll");
var getFile_1 = require("./callbacks/getFile/getFile");
var deleteRepository_1 = require("./callbacks/deleteRepository");
var addRepository_1 = require("./callbacks/addRepository");
//Запросы
app.use(express_1.default.static(__dirname + '/pages'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default({
    origin: 'http://localhost:3000'
}));
//Данные с сервера
app.get('/api/repos', getRepos_1.getRepos);
app.get('/api/repos/:repoID/commits/:commitHash', getCommits_1.getCommits);
app.get('/api/repos/:repoID/commits/:commitHash/diff', getDiff_1.getDiff);
app.get('/api/repos/:repoID', getRepository_1.getRepository);
app.get('/api/repos/:repoID/all', getRepositoryAll_1.getRepositoryAll); //Возвращает содержимое всех папок и подпапок репозитория (для поиска по файлам)
app.get('/api/repos/:repoID/tree/:commitHash/:path([^/]*)?', getRepository_1.getRepository);
app.get('/api/repos/:repoID/blob/:commitHash/:pathToFile([^/]*)?', getFile_1.getFile);
app.delete('/api/repos/:repoID', deleteRepository_1.deleteRepository);
app.post('/api/repos(/:repoID)?', addRepository_1.addRepository);
app.use(function (request, response) { return response.status(404).send('URL not found'); });
app.listen(3030);
