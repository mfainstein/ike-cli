"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitCommand = void 0;
var inversify_1 = require("inversify");
var CommandBase_1 = require("../core/CommandBase");
var ProjectBuilder_1 = require("../core/ProjectBuilder");
var InitCommand = /** @class */ (function (_super) {
    __extends(InitCommand, _super);
    function InitCommand() {
        var _this = _super.call(this) || this;
        _this.name = "init";
        _this.description = "init a scripting project";
        _this.usage = "ike init";
        _this.arguments = [];
        _this.options = [{ "name": "path", "flag": "-p, --path <path>", description: "custom path" }];
        _this.options = [{ "name": "projectName", "flag": "-n, --projectName <projectName>", description: "name of the project" }];
        return _this;
    }
    InitCommand_1 = InitCommand;
    InitCommand.prototype.doExecute = function (argumentValues, optionValues) {
        var path = optionValues.get("path") || "../";
        var name = optionValues.get("projectName") || InitCommand_1.DEFAULT_PROJECT_NAME;
        var projectBuilder = new ProjectBuilder_1.ProjectBuilder(path);
        var projectFolder = projectBuilder.create(path, name);
        projectBuilder.installDependencies(projectFolder);
        //write in ProjectsDao
    };
    var InitCommand_1;
    InitCommand.DEFAULT_PROJECT_NAME = "IkeScripts";
    InitCommand = InitCommand_1 = __decorate([
        inversify_1.injectable()
    ], InitCommand);
    return InitCommand;
}(CommandBase_1.CommandBase));
exports.InitCommand = InitCommand;
