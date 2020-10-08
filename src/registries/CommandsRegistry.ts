import {Command} from "ike/out/Command";
export interface CommandsRegistry {
    getCommands(): Command[];

    getCommandByName(name: string): Command | undefined;

}