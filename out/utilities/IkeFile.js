"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IkeFile = void 0;
var path = __importStar(require("path"));
var IkeFile = /** @class */ (function () {
    function IkeFile(path) {
        this.path = path;
    }
    IkeFile.prototype.getAbsolutePath = function () {
        return this.path;
    };
    IkeFile.prototype.getName = function () {
        var nameWithExtension = path.basename(this.path);
        var extension = path.extname(this.path);
        return nameWithExtension.replace(extension, "");
    };
    IkeFile.prototype.getNameWithExtension = function () {
        return path.basename(this.path);
    };
    IkeFile.prototype.getParentFile = function () {
        var parentPath = path.dirname(this.path);
        return new IkeFile(parentPath);
    };
    IkeFile.prototype.getExtension = function () {
        return path.extname(this.path).slice(1);
    };
    IkeFile.prototype.listFiles = function (filter) {
        var fs = require('file-system');
        var paths = fs.readdirSync(this.path);
        var files = [];
        if (this.isDirectory()) {
            for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
                var fileName = paths_1[_i];
                var file = new IkeFile(this.path + "/" + fileName);
                if (filter && filter(file)) {
                    files.push(file);
                }
                else {
                    if (!filter) {
                        files.push(file);
                    }
                }
            }
        }
        return files;
    };
    IkeFile.prototype.exists = function () {
        var fs = require('file-system');
        return fs.existsSync(this.path);
    };
    IkeFile.prototype.isDirectory = function () {
        var fs = require('file-system');
        return fs.lstatSync(this.path).isDirectory();
    };
    return IkeFile;
}());
exports.IkeFile = IkeFile;
