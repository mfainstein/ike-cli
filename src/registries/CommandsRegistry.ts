import {Command} from "ike-framework/out/Command";
export interface CommandsRegistry {
    getCommands(): Command[];

    getCommandByName(name: string): Command | undefined;

}