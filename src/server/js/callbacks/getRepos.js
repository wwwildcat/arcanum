"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var pathToRepos = process.argv[2];
//Ручка GET /api/repos
exports.getRepos = function (request, response) {
    var repos = null;
    fs_1.default.readdir(pathToRepos, function (err, items) {
        if (err) {
            response.status(404).send(pathToRepos + ' not found');
        } //Оставить только директории
        repos = items.filter(function (item) { return fs_1.default.statSync(path_1.default.resolve(pathToRepos, item)).isDirectory(); });
        response.json(repos);
    });
};
