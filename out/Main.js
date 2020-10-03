#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Container_1 = require("./Container");
var Types_1 = require("./Types");
var commandsRegistry = Container_1.container.get(Types_1.Types.CommandsRegistry);
var cliProgram = Container_1.container.get(Types_1.Types.CommandsParser);
for (var _i = 0, _a = commandsRegistry.getCommands(); _i < _a.length; _i++) {
    var command = _a[_i];
    cliProgram.installCommand(command);
}
cliProgram.initAutoCompletion();
cliProgram.parse();
