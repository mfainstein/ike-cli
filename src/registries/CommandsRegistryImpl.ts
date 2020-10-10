import {CommandsRegistry} from "./CommandsRegistry";
import {injectable, multiInject} from "inversify";
import {Command} from "ike-framework/out/Command";
import {Types} from "../Types";
import * as Commander from 'commander';
import {CommandMetadata} from "ike-framework/out/CommandMetadata";


@injectable()
export class CommandsRegistryImpl implements CommandsRegistry {
    private commandByName: Map<string, Command>;
    private commanderCommandByName: Map<string, Commander.Command>;

    constructor(@multiInject(Types.Command) private commands: Command[]) {
        this.commandByName = new Map();
        this.commanderCommandByName = new Map();
        for (let command of commands) {
            let name: string =
                Reflect.getMetadata(CommandMetadata.NAME, command.constructor) || command.getDefaultName();
            this.commandByName.set(name, command);
        }
    }

    getCommandByName(name: string): Command | undefined {
        return this.commandByName.get(name);
    }

    getCommands(): Command[] {
        return this.commands;
    }


    //TODO: probably should move... to a separate registry
    setCommanderCommand(name: string, commanderCommand: Commander.Command): void {
        this.commanderCommandByName.set(name, commanderCommand);
    }

    getCommanderCommandByName(name: string):Commander.Command | undefined {
        return this.commanderCommandByName.get(name);
    }

}