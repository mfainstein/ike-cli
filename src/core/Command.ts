import {CommandOption} from "./CommandOption";
import * as Commander from 'commander';

export interface Command {
    name: string;
    description: string;
    usage: string;
    arguments: string[];
    options: CommandOption[]
    commanderCommand?: Commander.Command;


    setCommanderCommand(commanderCommand: Commander.Command): void;
    execute(...args: any[]): void;
}