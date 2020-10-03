"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBuilder = void 0;
var Files_1 = require("../utilities/Files");
var ProcessUtils_1 = require("../utilities/ProcessUtils");
var ProjectBuilder = /** @class */ (function () {
    function ProjectBuilder(path) {
    }
    ProjectBuilder.prototype.validate = function (path) {
        //TODO: here will validate this is an empty folder
    };
    ProjectBuilder.prototype.create = function (path, name) {
        var projectFolder = Files_1.Files.file(path, name);
        Files_1.Files.mkdir(projectFolder);
        Files_1.Files.mkdir(Files_1.Files.file(projectFolder, "src"));
        return projectFolder;
        //ProcessUtils.execSync("npm install ike -- save", projectFolder)
    };
    ProjectBuilder.prototype.installDependencies = function (projectFolder) {
        ProcessUtils_1.ProcessUtils.execSync("npm init -y", projectFolder);
        ProcessUtils_1.ProcessUtils.execSync("npm install typescript --save-dev", projectFolder);
    };
    return ProjectBuilder;
}());
exports.ProjectBuilder = ProjectBuilder;
