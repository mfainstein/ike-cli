import {injectable} from "inversify";
import * as Commander from 'commander';
import {CommandBase, commandName, description, requiredArgs, usage} from "ike-framework/out/CommandBase";
import {tsImport} from "ts-import";
import {CommandBaseAsync} from "ike-framework/out/CommandBaseAsync";

@injectable()
@commandName("execute")
@requiredArgs(["name"])
@description("Execute a command.")
@usage("ike execute <CommandName>")
export class ExecuteCommand extends CommandBaseAsync {
    private registry: any = {};

    constructor() {
        super();

    }

    async importSubCommands(): Promise<void> {

    }

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        this.registry["HelloWorld"]();

    }

}