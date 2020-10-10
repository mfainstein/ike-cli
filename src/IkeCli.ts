import {CommandsParser} from "./core/CommandsParser";
import {Command} from "ike-framework/out/Command";
import {CommandMetadata} from "ike-framework/out/CommandMetadata";
import {CommandOption} from "ike-framework/out/CommandOption";
import * as Commander from 'commander';
import {inject, injectable} from "inversify";

import "reflect-metadata";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {Types} from "./Types";

@injectable()
export class IkeCli implements CommandsParser {

    description: string;


    constructor(@inject(Types.CommandsRegistry) private commandsRegistry: CommandsRegistry) {
        this.description = "Create TS/JS scripts right from the console and straight to a cli utility.\n" +
            "Embrace you laziness, DRY, and never Bash Again!";
        this.setDescription();

    }

    setDescription(): void {
        Commander.program.description(this.description);
    }


    initAutoCompletion() {
        //TODO using omlette
    }

    buildOptionalArguments(commandArguments: string[]): string {
        //TODO: implement
        throw new Error("Not Implemented");
    }

    buildRequiredArguments(commandArguments: string[]): string {
        let commandArgumentsString = "";
        for (let argument of commandArguments) {
            commandArgumentsString = commandArgumentsString + " <" + argument + "> ";
        }
        return commandArgumentsString;
    }

    async installCommand(command: Command, cliParentCommand: Commander.Command = Commander.program) {
        //TODO: proper getter for reflection metadata
        let name: string = Reflect.getMetadata(CommandMetadata.NAME, command.constructor) || command.getDefaultName();
        let cliCommand: Commander.Command = cliParentCommand.command(name);

        let description: string = Reflect.getMetadata(CommandMetadata.DESCRIPTION, command.constructor) || [];
        cliCommand.description(description);

        let options: CommandOption[] = Reflect.getMetadata(CommandMetadata.OPTIONS, command.constructor) || [];
        for (let option of options) {
            cliCommand.option(option.flag, option.description);
        }
        let args: string[] = Reflect.getOwnMetadata(CommandMetadata.REQUIRED_ARGS, command.constructor) || [];
        cliCommand.arguments(this.buildRequiredArguments(args));


        //TODO: should be executed through a controller which saves the execution history
        cliCommand.action(async (...args: any) => {
            await command.execute(...args)
        });
        this.commandsRegistry.setCommanderCommand(name, cliCommand);

        for (let subCommand of command.getSubCommands()) {
            this.installCommand(subCommand, cliCommand);
        }
    }

    parse(): void {
        Commander.program.parse(process.argv);
    }


}