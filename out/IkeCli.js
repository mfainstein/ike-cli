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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IkeCli = void 0;
var Commander = __importStar(require("commander"));
var inversify_1 = require("inversify");
var IkeCli = /** @class */ (function () {
    function IkeCli() {
        this.description = "Create TS/JS scripts right from the console and straight to a cli utility.\n" +
            "Embrace you laziness, DRY, and never Bash Again!";
        this.setDescription();
    }
    IkeCli.prototype.setDescription = function () {
        Commander.program.description(this.description);
    };
    IkeCli.prototype.initAutoCompletion = function () {
        //TODO using omlette
    };
    IkeCli.prototype.buildArguments = function (commandArguments) {
        var commandArgumentsString = "";
        for (var _i = 0, commandArguments_1 = commandArguments; _i < commandArguments_1.length; _i++) {
            var argument = commandArguments_1[_i];
            commandArgumentsString = commandArgumentsString + " <" + argument + "> ";
        }
        return commandArgumentsString;
    };
    IkeCli.prototype.installCommand = function (command) {
        var cliCommand = Commander.program.command(command.name);
        command.setCommanderCommand(cliCommand);
        cliCommand.description(command.description);
        for (var _i = 0, _a = command.options; _i < _a.length; _i++) {
            var option = _a[_i];
            cliCommand.option(option.flag, option.description);
        }
        cliCommand.arguments(this.buildArguments(command.arguments));
        //TODO: should be executed through a controller which saves the execution history
        cliCommand.action(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            command.execute.apply(command, args);
        });
    };
    IkeCli.prototype.parse = function () {
        Commander.program.parse(process.argv);
    };
    IkeCli = __decorate([
        inversify_1.injectable()
    ], IkeCli);
    return IkeCli;
}());
exports.IkeCli = IkeCli;
