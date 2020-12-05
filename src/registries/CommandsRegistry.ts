import {Command} from "ike-framework/out/core/Command";
import * as Commander from 'commander';
export interface CommandsRegistry {
    getCommands(): Command[];

    getCommandByName(name: string): Command | undefined;

    setCommanderCommand(name: string, commanderCommand: Commander.Command): void;

    getCommanderCommandByName(name: string):Commander.Command | undefined;

}
