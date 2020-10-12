import {CommandsParser} from "./core/CommandsParser";
import {Command} from "ike-framework/out/Command";
import {CommandMetadata} from "ike-framework/out/CommandMetadata";
import {CommandOption} from "ike-framework/out/CommandOption";
import * as Commander from 'commander';
import {inject, injectable} from "inversify";

import "reflect-metadata";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {Types} from "./Types";
import {CommandBaseSync} from "ike-framework/out/CommandBaseSync";
import {CommandSync} from "ike-framework/out/CommandSync";
import {CommandAsync} from "ike-framework/out/CommandAsync";

@injectable()
export class IkeCli implements CommandsParser {

    description: string;


    constructor(@inject(Types.CommandsRegistry) private commandsRegistry: CommandsRegistry) {
        this.description = "Create TS/JS scripts right from the console and straight to a cli utility.\n" +
            "Embrace you laziness, DRY, and never Bash Again!";
        this.setDescription();

    }

    private instanceOfCommandSync(instance: any): instance is CommandSync {
        return instance["executionMode"] == "Sync";
    }

    private instanceOfCommandAsync(instance: any): instance is CommandAsync {
        return instance["executionMode"] == "Async";
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

        await command.setup();
        let name: string = Reflect.getMetadata(CommandMetadata.Name, command.constructor) || command.getDefaultName();
        let cliCommand: Commander.Command = cliParentCommand.command(name);

        let description: string = Reflect.getMetadata(CommandMetadata.Description, command.constructor) || [];
        cliCommand.description(description);

        let options: CommandOption[] = Reflect.getMetadata(CommandMetadata.Options, command.constructor) || [];
        for (let option of options) {
            cliCommand.option(option.flag, option.description);
        }
        let args: string[] = Reflect.getOwnMetadata(CommandMetadata.RequiredArgs, command.constructor) || [];
        cliCommand.arguments(this.buildRequiredArguments(args));

        if (this.instanceOfCommandSync(command)){
            cliCommand.action((...args: any) => {
                command.execute(...args)
            });
        }
        if (this.instanceOfCommandAsync(command)){
            cliCommand.action(async(...args: any) => {
                await command.execute(...args)
            });
        }

        //TODO: should be executed through a controller which saves the execution history

            this.commandsRegistry.setCommanderCommand(name, cliCommand);

        for (let subCommand of command.getSubCommands()) {
            this.installCommand(subCommand, cliCommand);
        }
    }

    parse(): void {
        Commander.program.parse(process.argv);
    }


}