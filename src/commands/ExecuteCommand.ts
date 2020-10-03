import {CommandBase} from "../core/CommandBase";
import {injectable} from "inversify";
import {CommandOption} from "../core/CommandOption";
import * as Commander from 'commander';

@injectable()
export class ExecuteCommand extends CommandBase {
    arguments: string[];
    description: string;
    name: string;
    options: CommandOption[];
    usage: string;


    constructor() {
        super();
        this.description = "execute a command";
        this.name = "execute";
        this.usage = "ike execute <commandName>";
        this.options = [];
        this.arguments = ["commandName"];

    }

    afterCommanderCommandSet(): void {
        super.afterCommanderCommandSet();
        //add all commands in the current project
        /*let command:Commander.Command = Commander.program.command("test");
        command.description("baah");
        if (this.commanderCommand){
            this.commanderCommand.addCommand(command);
        }*/
    }


    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {

    }

}