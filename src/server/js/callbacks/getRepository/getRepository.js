"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var getCommandParams_1 = require("../getCommandParams");
var getRepositoryData_1 = require("./getRepositoryData");
var pathToRepos = process.argv[2];
//Ручка GET /api/repos/:repositoryId(/tree/:commitHash/:path)
exports.getRepository = function (request, response) {
    var commitHash = request.params['commitHash'] ? request.params['commitHash'] : 'master';
    var pathToRepo = path_1.default.join(pathToRepos, request.params['repositoryId']);
    fs_1.default.access(pathToRepo, function (err) {
        if (err) {
            response.status(404).send(pathToRepo + ' not found');
        }
        else {
            var pathToDir_1 = request.params['path'] ? path_1.default.join(pathToRepo, request.params['path']) : pathToRepo;
            fs_1.default.access(pathToDir_1, function (err) {
                if (err) {
                    response.status(404).send(pathToDir_1 + ' not found');
                }
                else {
                    var out_1 = '';
                    var gitTree = child_process_1.spawn('git', getCommandParams_1.getCommandParams(request, 'getRepository'), { cwd: pathToRepo });
                    gitTree.stdout.on('data', function (chunk) {
                        out_1 += chunk.toString();
                    });
                    gitTree.on('error', function (err) {
                        throw err;
                    });
                    gitTree.on('close', function () {
                        if (!out_1) { //Проверка существования ветки или хэша коммита
                            response.status(404).send(commitHash + ' not found');
                        }
                        else {
                            var promises_1 = [];
                            getRepositoryData_1.getInitialData(out_1).forEach(function (obj) {
                                var promise = new Promise(function (resolve) {
                                    var out = '';
                                    var commitInfo = child_process_1.spawn('git', ['log', '-1', commitHash, '--', obj.name], { cwd: pathToDir_1 });
                                    commitInfo.stdout.on('data', function (chunk) {
                                        out += chunk.toString();
                                    });
                                    commitInfo.on('close', function () {
                                        resolve(Object.assign(obj, getRepositoryData_1.getFullData(out)));
                                    });
                                });
                                promises_1.push(promise);
                            });
                            var outerPromise = Promise.all(promises_1);
                            outerPromise.then(function (value) { return response.json(value); }); //Получение данных из промисов
                        }
                    });
                }
            });
        }
    });
};
