"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBase = void 0;
var inversify_1 = require("inversify");
var CommandBase = /** @class */ (function () {
    function CommandBase() {
    }
    CommandBase.prototype.buildArguments = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argumentsMap = new Map();
        var i = 0;
        for (var _a = 0, _b = this.arguments; _a < _b.length; _a++) {
            var argument = _b[_a];
            var value = args[i];
            argumentsMap.set(argument, value);
            i++;
        }
        return argumentsMap;
    };
    CommandBase.prototype.buildOptions = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var optionsMap = new Map();
        var options = args[this.arguments.length];
        for (var _a = 0, _b = this.options; _a < _b.length; _a++) {
            var option = _b[_a];
            //TODO: this is dangerous, actually the command name should be derived from the "flag"
            //TODO: see this same comment under CommandOption
            optionsMap.set(option.name, options[option.name]);
        }
        return optionsMap;
    };
    CommandBase.prototype.setCommanderCommand = function (commanderCommand) {
        this.commanderCommand = commanderCommand;
        this.afterCommanderCommandSet();
    };
    CommandBase.prototype.execute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var argumentsMap = this.buildArguments.apply(this, args);
        var optionsMap = this.buildOptions.apply(this, args);
        this.doExecute(argumentsMap, optionsMap);
    };
    CommandBase.prototype.afterCommanderCommandSet = function () {
        //will be overridden - TODO: is this needed?
    };
    CommandBase = __decorate([
        inversify_1.injectable()
    ], CommandBase);
    return CommandBase;
}());
exports.CommandBase = CommandBase;
