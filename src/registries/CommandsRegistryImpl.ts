import {CommandsRegistry} from "./CommandsRegistry";
import {injectable, multiInject} from "inversify";
import {Command} from "../core/Command";
import {Types} from "../Types";

@injectable()
export class CommandsRegistryImpl implements CommandsRegistry {
    private commandByName: Map<string, Command>;

    constructor(@multiInject(Types.Command) private commands:Command[]){
        this.commandByName = new Map();
        for (let command of commands){
            this.commandByName.set(command.name, command);
        }
    }

    getCommandByName(name: string): Command | undefined {
        return this.commandByName.get(name);
    }

    getCommands(): Command[] {
        return this.commands;
    }

}