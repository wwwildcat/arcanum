"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var child_process_1 = require("child_process");
var pathToRepos = process.argv[2];
//Ручка POST /api/repos + { url: ‘repo-url’ }
exports.addRepository = function (request, response) {
    var pathToRepo = pathToRepos;
    var url = request.body.url.replace(/.*(?=:\/\/)/, 'git');
    var params = ['clone', url];
    var repoTitle = request.body.url.match(/(?<=\/)[^/]*\/?$/)[0].match(/[^/]*/)[0];
    if (request.params['repoID']) {
        params.push(request.params['repoID']);
        repoTitle = request.params['repoID'];
    }
    pathToRepo = path_1.default.join(pathToRepos, repoTitle);
    fs_1.default.access(pathToRepo, function (err) {
        if (!err) {
            response.send(repoTitle + ' already exists');
        }
        else {
            child_process_1.execFile('git', params, { cwd: pathToRepos }, function (err) {
                if (err) {
                    response.status(404).send(request.body.url + ' not found');
                }
                else {
                    response.send(repoTitle + ' has been added succesfully');
                }
            });
        }
    });
};
