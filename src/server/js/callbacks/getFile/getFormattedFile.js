"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedFile = function (out) {
    var fileLines = out.split(/\n/);
    if (fileLines.length > 1) {
        fileLines.pop(); //Файл разбит на строки, последняя пустая убрана
    }
    return fileLines;
};
