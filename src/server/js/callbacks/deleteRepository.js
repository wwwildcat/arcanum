"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pathToRepos = process.argv[2];
//Вспомогательная функция для удаления непустой директории
var deleteDir = function (pathToDir) {
    fs_1.default.readdirSync(pathToDir).forEach(function (item) {
        var pathToItem = path_1.default.resolve(pathToDir, item);
        if (fs_1.default.statSync(pathToItem).isFile()) {
            fs_1.default.unlinkSync(pathToItem);
        }
        else {
            deleteDir(pathToItem);
        }
    });
    fs_1.default.rmdirSync(pathToDir);
};
//Ручка DELETE /api/repos/:repositoryId
exports.deleteRepository = function (request, response) {
    var pathToRepo = path_1.default.join(pathToRepos, request.params['repositoryId']);
    fs_1.default.access(pathToRepo, function (err) {
        if (err) {
            response.status(404).send(pathToRepo + ' not found');
        }
        else {
            deleteDir(pathToRepo);
            response.send(request.params['repositoryId'] + ' has been deleted succesfully');
        }
    });
};
