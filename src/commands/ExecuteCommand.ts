
import {injectable} from "inversify";
import * as Commander from 'commander';
import {CommandOption} from "ike-framework/out/CommandOption";
import {CommandBase} from "ike-framework/out/CommandBase";
import {Command} from "ike-framework/out/Command";
import {tsImport} from "ts-import";

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

    //called from CommandBase
    async afterCommanderCommandSet(): Promise<void> {
        super.afterCommanderCommandSet();

        //const compiledCommand:any = await tsImport.compile("/Users/markfainstein/PersonalDev/IkeScripts/src/First.ts");
        //let command = new compiledCommand.ACommand();
       // console.log(JSON.stringify(compiledCommand.exports.ACommand));
        if (this.commanderCommand) {
            //let name:string = Reflect.getMetadata("ike:commandName", command.constructor);
            //console.log(name);
            //this.commanderCommand.addCommand(compiledCommand);
        }
        //add all commands in the current project
        /*let command:Commander.Command = Commander.program.command("test");
        command.description("baah");
        if (this.commanderCommand){

        }*/
    }


    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {

    }

}