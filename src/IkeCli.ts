import {CommandsParser} from "./core/CommandsParser";
import {Command} from "./core/Command";
import * as Commander from 'commander';
import {injectable} from "inversify";

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

    installCommand(command: Command) {
        let cliCommand: Commander.Command = Commander.program.command(command.name);
        command.setCommanderCommand(cliCommand);
        cliCommand.description(command.description);

        for (let option of command.options) {
            cliCommand.option(option.flag, option.description);
        }
        cliCommand.arguments(this.buildArguments(command.arguments));


        //TODO: should be executed through a controller which saves the execution history
        cliCommand.action((...args:any)=>{command.execute(...args)});
    }

    parse(): void {
        Commander.program.parse(process.argv);
    }


}