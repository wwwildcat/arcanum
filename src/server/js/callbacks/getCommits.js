"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var pathToRepos = process.argv[2];
//Ручка GET /api/repos/:repositoryId/commits/:commitHash
exports.getCommits = function (request, response) {
    var pathToRepo = path_1.default.join(pathToRepos, request.params['repositoryId']);
    fs_1.default.access(pathToRepo, function (err) {
        if (err) {
            response.status(404).send(pathToRepo + ' not found');
        }
        else {
            var out_1 = '';
            var gitLog = child_process_1.spawn('git', ['log', request.params['commitHash']], { cwd: pathToRepo });
            gitLog.stdout.on('data', function (chunk) {
                out_1 += chunk.toString();
            });
            gitLog.on('error', function (err) {
                throw err;
            });
            gitLog.on('close', function () {
                if (!out_1) { //Проверка существования ветки или хэша коммита
                    response.status(404).send(request.params['commitHash'] + ' not found');
                }
                else {
                    var commits = out_1.split(/\n\n(?=\S)/);
                    var commitsJSON = commits.map(function (commit) { return ({
                        'SHA-1': commit.match(/[a-f0-9]{40}/)[0],
                        'author': commit.match(/(?<=Author:).*/)[0].trim(),
                        'date': commit.match(/(?<=Date:).*/)[0].trim(),
                        'message': commit.match(/(?<=\n\n).*/)[0].trim()
                    }); });
                    //Бонусная ручка (выдача коммитов в заданном диапазоне)
                    if (request.query.from && request.query.to) {
                        var from = Number(request.query.from);
                        var to = Number(request.query.to);
                        var start = 1;
                        var end = commitsJSON.length;
                        if ((from > end && to > end) || (from < start && to < start)) {
                            response.status(404).send('No such commits');
                        }
                        //Определение границ диапазона
                        else if (from >= start && from <= end) {
                            if (to >= start && to <= end) {
                                end = to;
                            }
                            else if (to < start) {
                                end = start;
                            }
                            start = from;
                        }
                        else if (from > end) {
                            start = end;
                            if (to >= start && to <= end) {
                                end = to;
                            }
                            else {
                                end = 1;
                            }
                        }
                        else if (to <= end) {
                            end = to;
                        }
                        //Преобразование и выдача массива коммитов
                        if (start <= end) {
                            response.json(commitsJSON.slice(start - 1, end));
                        }
                        else {
                            response.json(commitsJSON.slice(end - 1, start).reverse());
                        }
                    }
                    //Выдача полного списка коммитов
                    else {
                        response.json(commitsJSON);
                    }
                }
            });
        }
    });
};
