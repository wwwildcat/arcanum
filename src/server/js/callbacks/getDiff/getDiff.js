"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var getFormattedDiff_1 = require("./getFormattedDiff");
var getCommandParams_1 = require("../getCommandParams");
var pathToRepos = process.argv[2];
//Ручка GET /api/repos/:repositoryId/commits/:commitHash/diff
exports.getDiff = function (request, response) {
    var pathToRepo = path_1.default.join(pathToRepos, request.params['repositoryId']);
    fs_1.default.access(pathToRepo, function (err) {
        if (err) {
            response.status(404).send(pathToRepo + ' not found');
        }
        else {
            var out_1 = '';
            var gitDiff = child_process_1.spawn('git', getCommandParams_1.getCommandParams(request, 'getDiff'), { cwd: pathToRepo });
            gitDiff.stdout.on('data', function (chunk) {
                out_1 += chunk.toString();
            });
            gitDiff.on('error', function (err) {
                throw err;
            });
            gitDiff.on('close', function () {
                if (!out_1) { //Проверка существования ветки или хэша коммита
                    response.status(404).send(request.params['commitHash'] + ' not found');
                }
                else {
                    response.json(getFormattedDiff_1.getFormattedDiff(out_1));
                }
            });
        }
    });
};
