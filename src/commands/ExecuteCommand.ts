import {injectable} from "inversify";
import * as Commander from 'commander';
import {CommandBase, commandName, description, requiredArgs, usage} from "ike-framework/out/CommandBase";
import {tsImport} from "ts-import";

@injectable()
@commandName("execute")
@requiredArgs(["name"])
@description("Execute a command.")
@usage("ike execute <CommandName>")
export class ExecuteCommand extends CommandBase {
    private registry: any = {};

    constructor() {
        super();

    }

    async importSubCommands(): Promise<void> {

    }

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
        this.registry["HelloWorld"]();

    }

}