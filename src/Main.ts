#!/usr/bin/env node

import "reflect-metadata";
import {container} from "./Container";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {Types} from "./Types";
import {CommandsParser} from "./core/CommandsParser";
import { tsImport } from 'ts-import';
import {Files} from "./utilities/Files";
import {LocalFile} from "./utilities/LocalFile";

let commandsRegistry:CommandsRegistry = container.get<CommandsRegistry>(Types.CommandsRegistry);
let cliProgram:CommandsParser = container.get<CommandsParser>(Types.CommandsParser);

let installedCommands = [];

for (let command of commandsRegistry.getCommands()){
    installedCommands.push(cliProgram.installCommand(command));
}

Promise.all(installedCommands).then(()=>{
    cliProgram.initAutoCompletion();
    cliProgram.parse();
});



