#!/usr/bin/env node

import "reflect-metadata";
import {container} from "./Container";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {Types} from "./Types";
import {CommandsParser} from "./core/CommandsParser";
let commandsRegistry:CommandsRegistry = container.get<CommandsRegistry>(Types.CommandsRegistry);
let cliProgram:CommandsParser = container.get<CommandsParser>(Types.CommandsParser);

for (let command of commandsRegistry.getCommands()){
    cliProgram.installCommand(command);
}

cliProgram.initAutoCompletion();
cliProgram.parse();