"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsRegistryImpl = void 0;
var inversify_1 = require("inversify");
var Types_1 = require("../Types");
var CommandsRegistryImpl = /** @class */ (function () {
    function CommandsRegistryImpl(commands) {
        this.commands = commands;
        this.commandByName = new Map();
        for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
            var command = commands_1[_i];
            this.commandByName.set(command.name, command);
        }
    }
    CommandsRegistryImpl.prototype.getCommandByName = function (name) {
        return this.commandByName.get(name);
    };
    CommandsRegistryImpl.prototype.getCommands = function () {
        return this.commands;
    };
    CommandsRegistryImpl = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.multiInject(Types_1.Types.Command))
    ], CommandsRegistryImpl);
    return CommandsRegistryImpl;
}());
exports.CommandsRegistryImpl = CommandsRegistryImpl;
