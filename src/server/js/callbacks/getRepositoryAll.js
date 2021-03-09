"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var pathToRepos = process.argv[2];
//Ручка GET /api/repos/:repositoryId/all
exports.getRepositoryAll = function (request, response) {
    var pathToRepo = path_1.default.join(pathToRepos, request.params['repositoryId']);
    var commitHash = 'master';
    var params = ['ls-tree', '-t', '-r', '--name-only', commitHash];
    fs_1.default.access(pathToRepo, function (err) {
        if (err) {
            response.status(404).send(pathToRepo + ' not found');
        }
        else {
            var out_1 = '';
            var gitTree = child_process_1.spawn('git', params, { cwd: pathToRepo });
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
                    var names = out_1.split(/\n/);
                    names.pop(); //Удаление последнего пустого элемента
                    var promises_1 = [];
                    names.forEach(function (name) {
                        var promise = new Promise(function (resolve) {
                            var out = '';
                            var commitInfo = child_process_1.spawn('git', ['log', '-1', name], { cwd: pathToRepo });
                            commitInfo.stdout.on('data', function (chunk) {
                                out += chunk.toString();
                            });
                            commitInfo.on('close', function () {
                                var object = {
                                    'name': name,
                                    'shortName': name.split('/').reverse()[0],
                                    'hash': out.match(/(?<=commit )\S{6}/)[0],
                                    'message': out.match(/(?<=\n\n).*/)[0].trim(),
                                    'commiter': out.match(/(?<=Author:).*(?=<)/)[0].trim(),
                                    'date': out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
                                };
                                resolve(object);
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
};
