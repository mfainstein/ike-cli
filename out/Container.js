"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
require("reflect-metadata");
var inversify_1 = require("inversify");
var Types_1 = require("./Types");
var ConfigureCommand_1 = require("./commands/ConfigureCommand");
var IkeCli_1 = require("./IkeCli");
var CommandsRegistryImpl_1 = require("./registries/CommandsRegistryImpl");
var InitCommand_1 = require("./commands/InitCommand");
var ExecuteCommand_1 = require("./commands/ExecuteCommand");
var container = new inversify_1.Container();
exports.container = container;
//commands
container.bind(Types_1.Types.Command).to(ConfigureCommand_1.ConfigureCommand);
container.bind(Types_1.Types.Command).to(InitCommand_1.InitCommand);
container.bind(Types_1.Types.Command).to(ExecuteCommand_1.ExecuteCommand);
container.bind(Types_1.Types.CommandsParser).to(IkeCli_1.IkeCli);
container.bind(Types_1.Types.CommandsRegistry).to(CommandsRegistryImpl_1.CommandsRegistryImpl);
