"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommandParams = function (request, type) {
    var commitHash = request.params['commitHash'] ? request.params['commitHash'] : 'master';
    var pathParam = commitHash;
    var params = [];
    if (request.params['path']) {
        pathParam += ':' + request.params['path'];
    }
    else if (request.params['pathToFile']) {
        pathParam += ':' + request.params['pathToFile'];
    }
    if (type === 'getRepository') {
        params = ['ls-tree', pathParam];
    }
    else if (type === 'getDiff') {
        params = ['diff', commitHash + '~', commitHash];
    }
    else if (type === 'getFile') {
        params = ['show', pathParam];
    }
    return params;
};
