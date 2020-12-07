import {inject, injectable} from "inversify";
import * as Commander from 'commander';
import {CommandBase, commandName, description, options, requiredArgs, usage} from "ike-framework/out/core/CommandBase";
import {tsImport, Compiler} from "ts-import";
import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {Types} from "../Types";
import {ExecutableCommandsDao} from "../services/dal/ExecutableCommandsDao";
import {ExecutableCommand} from "../core/ExecutableCommand";
import {Command} from "ike-framework/out/core/Command";
import ora from 'ora';
import tsNode from "ts-node";


@injectable()
@commandName("execute")
@requiredArgs(["name"])
// TODO: @options([{"name":"noCompile", "flag": "-nc, --noCompile", description: "do not compile"},]) ?
@description("Execute a command.")
@usage("ike execute <CommandName>")
export class ExecuteCommand extends CommandBaseAsync {

    private commandClassNames: string[];

    constructor(@inject(Types.ExecutableCommandsDao) private executableCommandsDao: ExecutableCommandsDao) {
        super();
        this.commandClassNames = [];

    }

    async setup(): Promise<void> {
        await this.importSubCommands();
    }

    async importSubCommands(): Promise<void> {
        let nowInSecs = Date.now() / 1000;
        //TODO: since setup is awaiting, we cannot setTimeout here in this block...
        //TODO: probably the spinner handling should happen as a command life cycle step controller from outside.
        let spinner: ora.Ora = ora("Getting the latest news in the scripting world...").start();
        let dir = process.cwd();
        let executableCommands: ExecutableCommand[] = await this.executableCommandsDao.getAll();
        //tsImport.options.flags = [];
        let compilePromises: Promise<any>[] = [];
        for (let executableCommand of executableCommands) {
            //TODO: should compile all sub commands every time (on change) or only the relevant command running?
            //TODO: if only the relevant command running, then the metadata might be out dated.
            this.commandClassNames.push(executableCommand.className);
            compilePromises.push(tsImport.compile(executableCommand.path));
            process.chdir(dir); //TODO: real hack, should understand why this happens...
        }
        //TODO: the compiled object contains the class as part of its exports
        //TODO: find a better way to extract the Command so the type Command will take effect.
        let commands: any[] = await Promise.all(compilePromises);
        let index: number = 0;
        for (let commandExports of commands) {
            let commandClassName: string = this.commandClassNames[index];
            let command: Command = new commandExports[commandClassName];
            this.addSubCommand(command);
            index++;
        }
        spinner.stop();
        spinner.clear();
        //add a parameter and better handling of execution time
        //console.log("Execution Time:"+ (Date.now()/1000-nowInSecs));
    }

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        let commandName: string | undefined = argumentValues.get("name");
        if (!commandName) {
            throw new Error("Fatal! Command name is required!");
        }
        let command: ExecutableCommand;
        try {
            command = await this.executableCommandsDao.get(commandName);
        }
        catch (e) {
            console.error("Could not find command with name " + commandName);
        }

    }

}
