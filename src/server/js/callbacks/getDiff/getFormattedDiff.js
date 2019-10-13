"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDiff = function (out) {
    var modifiedFiles = out.split(/\s(?=diff --git)/);
    var diffJSON = modifiedFiles.map(function (file) {
        var changeHunks = file.match(/@@.*/s)[0].split(/\s(?=@@.*@@)/);
        var changeHunksJSON = changeHunks.map(function (hunk) { return ({
            'range': hunk.match(/(?<=@@)[^@]*/)[0].trim(),
            'lines': hunk.match(/(?<=@@.*@@).*/s)[0]
        }); });
        return {
            'pathToFile': file.match(/(?<=\+\+\+ b\/).*/)[0],
            'changeHunks': changeHunksJSON
        };
    });
    return diffJSON;
};
