import {Command} from "../core/Command";
import {CommandOption} from "../core/CommandOption";
import {inject, injectable} from "inversify";
import {CommandBase} from "../core/CommandBase";

@injectable()
export class ConfigureCommand extends CommandBase {
    name: string;
    arguments: string[];
    description: string;
    options: CommandOption[];
    usage: string;

    constructor() {
        super();
        this.name = "configure";
        this.arguments = [];
        this.description = "configure ";
        this.options = [];
        this.usage = "ike configure";
    }

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
    }


}