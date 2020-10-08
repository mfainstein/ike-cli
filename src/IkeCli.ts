import {CommandsParser} from "./core/CommandsParser";
import {Command} from "ike-framework/out/Command";
import {CommandOption} from "ike-framework/out/CommandOption";
import * as Commander from 'commander';
import {injectable} from "inversify";

import "reflect-metadata";

@injectable()
export class IkeCli implements CommandsParser {

    description: string;


    constructor() {
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

    buildArguments(commandArguments:string[]):string{
        let commandArgumentsString = "";
        for (let argument of commandArguments){
            commandArgumentsString = commandArgumentsString + " <"+argument+"> ";
        }
        return commandArgumentsString;
    }

    async installCommand(command: Command) {
        //TODO: proper getter for reflection metadata
        let name: string = Reflect.getMetadata("ike:commandName", command.constructor) || command.getDefaultName();
        let cliCommand: Commander.Command = Commander.program.command(name);
        await command.setCommanderCommand(cliCommand);
        let description: string = Reflect.getMetadata("ike:description", command.constructor) || [];
        cliCommand.description(description);

        let options: CommandOption[] = Reflect.getMetadata("ike:options", command.constructor) || [];
        for (let option of options) {
            cliCommand.option(option.flag, option.description);
        }
        let args: string[] = Reflect.getOwnMetadata("ike:requiredArguments", command.constructor) || [];
        cliCommand.arguments(this.buildArguments(args));


        //TODO: should be executed through a controller which saves the execution history
        cliCommand.action((...args:any)=>{command.execute(...args)});
    }

    parse(): void {
        Commander.program.parse(process.argv);
    }


}