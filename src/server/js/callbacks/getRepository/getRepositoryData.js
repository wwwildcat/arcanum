"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialData = function (out) {
    var strings = out.split(/\n./);
    var objects = strings.map(function (obj) { return ({
        'name': obj.match(/(?<=\t).*/)[0],
        'type': obj.match(/(?<=\s)\S*/)[0]
    }); });
    return objects;
};
exports.getFullData = function (out) { return ({
    'hash': out.match(/(?<=commit )\S{6}/)[0],
    'message': out.match(/(?<=\n\n).*/)[0].trim(),
    'commiter': out.match(/(?<=Author:).*(?=<)/)[0].trim(),
    'date': out.match(/(?<=Date:).*(?=\+)/)[0].trim(),
}); };
