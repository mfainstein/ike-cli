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
exports.Files = void 0;
var IkeFile_1 = require("./IkeFile");
var path = __importStar(require("path"));
var Files = /** @class */ (function () {
    function Files() {
    }
    Files.getPlaceHolderAbsolutePath = function (placeholderRelativePath) {
        //Path to ToolsServer dir
        var mainAbsolutePath = path.join(__dirname, "../../../");
        var joined = path.join(mainAbsolutePath, placeholderRelativePath);
        var root = path.normalize(joined);
        return root;
    };
    Files.isPlaceholderValid = function (placeholder) {
        return placeholder.startsWith("$") && placeholder.endsWith("$") && placeholder.length > 3;
    };
    Files.setPlaceholders = function (config) {
        for (var placeholderName in config.placeholders) {
            this.setPlaceholder(placeholderName, config.placeholders.get(placeholderName) || "");
        }
    };
    Files.setPlaceholder = function (placeholderName, placeholderPath) {
        var placeholderAbsolutePath = this.getPlaceHolderAbsolutePath(placeholderPath);
        placeholderName = placeholderName.toUpperCase();
        if (!this.isPlaceholderValid(placeholderName)) {
            return false;
        }
        this.placeHolders.set(placeholderName, placeholderAbsolutePath);
        return true;
    };
    Files.combinePaths = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return path.join.apply(path, paths);
    };
    Files.normalize = function (pathToNormalize) {
        return path.normalize(pathToNormalize);
    };
    Files.replaceTokensInPath = function (path) {
        this.placeHolders.forEach(function (value, key) {
            path = path.replace(key, value);
        });
        return path;
    };
    Files.isFile = function (pathOrFile) {
        return pathOrFile.getAbsolutePath !== undefined;
    };
    /**
     * file factory
     * @returns {IkeFile}
     */
    Files.file = function (pathOrFile, path) {
        var basePath = "";
        if (this.isFile(pathOrFile)) {
            basePath = pathOrFile.getAbsolutePath();
        }
        else {
            basePath = pathOrFile;
        }
        if (!path) {
            path = "";
        }
        path = this.replaceTokensInPath(path);
        basePath = this.replaceTokensInPath(basePath);
        var newPath = this.normalize(this.combinePaths(basePath, path));
        var file = new IkeFile_1.IkeFile(newPath);
        return file;
    };
    Files.copyFolder = function (source, target) {
        //noinspection TypeScriptUnresolvedFunction
        this.fs_extra.copySync(source.getAbsolutePath(), target.getAbsolutePath());
    };
    Files.copyFile = function (source, target) {
        //noinspection TypeScriptUnresolvedFunction
        this.fs.copyFileSync(source.getAbsolutePath(), target.getAbsolutePath());
    };
    Files.readFile = function (source) {
        if (source.isDirectory()) {
            return;
        }
        return this.fs.readFileSync(source.getAbsolutePath());
    };
    Files.readJson = function (source) {
        if (source.getExtension() != "json") {
            return;
        }
        return JSON.parse(this.readFile(source));
    };
    Files.writeFile = function (file) {
        this.fs.writeFile(file.getAbsolutePath(), 'test', function () {
        });
    };
    Files.computeMd5 = function (content) {
        var stringContent;
        if (typeof content == "string") {
            stringContent = content;
        }
        else {
            stringContent = JSON.stringify(content, null, 4);
        }
        var md5 = require('md5');
        return md5(stringContent);
    };
    Files.delete = function (fileToDelete) {
        this.fs.unlinkSync(fileToDelete.getAbsolutePath());
    };
    Files.mkdir = function (file) {
        var mkdirp = require('mkdirp');
        //TODO: better with fs
        mkdirp.sync(file.getAbsolutePath());
    };
    //TODO: move to imports!
    Files.fs = require('fs');
    Files.fs_extra = require('fs-extra');
    Files.placeHolders = new Map();
    return Files;
}());
exports.Files = Files;
