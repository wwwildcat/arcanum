"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var getCommandParams_1 = require("../getCommandParams");
var getFormattedFile_1 = require("./getFormattedFile");
var pathToRepos = process.argv[2];
//Ручка GET /api/repos/:repositoryId/blob/:commitHash/:pathToFile
exports.getFile = function (request, response) {
    var pathToFile = path_1.default.join(pathToRepos, request.params['repositoryId']);
    fs_1.default.access(pathToFile, function (err) {
        if (err) {
            response.status(404).send(pathToFile + ' not found');
        }
        else {
            var out_1 = '';
            var gitBlob = child_process_1.spawn('git', getCommandParams_1.getCommandParams(request, 'getFile'), { cwd: pathToFile });
            gitBlob.stdout.on('data', function (chunk) {
                out_1 += chunk.toString();
            });
            gitBlob.on('error', function (err) {
                throw err;
            });
            gitBlob.on('close', function () {
                if (!out_1) { //Проверка существования ветки или хэша коммита
                    response.status(404).send(request.params['commitHash'] + ' not found');
                }
                else {
                    response.json(getFormattedFile_1.getFormattedFile(out_1));
                }
            });
        }
    });
};
