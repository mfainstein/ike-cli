import {Command} from "../core/Command";

export interface CommandsRegistry {
    getCommands(): Command[];

    getCommandByName(name: string): Command | undefined;

}