import {Command} from "./Command";
import {CommandOption} from "./CommandOption";
import {injectable} from "inversify";
import * as Commander from 'commander';

@injectable()
export abstract class CommandBase implements Command {

    abstract arguments: string[];
    abstract description: string;
    abstract name: string;
    abstract options: CommandOption[];
    abstract usage: string;
    commanderCommand?: Commander.Command;

    buildArguments(...args: any): Map<string, string> {
        let argumentsMap: Map<string, string> = new Map();
        let i: number = 0;
        for (let argument of this.arguments) {
            let value: string = args[i];
            argumentsMap.set(argument, value);
            i++;
        }
        return argumentsMap;
    }

    buildOptions(...args: any): Map<string, string> {
        let optionsMap: Map<string, string> = new Map();
        let options: any = args[this.arguments.length];
        for (let option of this.options) {
            //TODO: this is dangerous, actually the command name should be derived from the "flag"
            //TODO: see this same comment under CommandOption
            optionsMap.set(option.name, options[option.name]);
        }
        return optionsMap;

    }

    setCommanderCommand(commanderCommand: Commander.Command): void {
        this.commanderCommand = commanderCommand;
        this.afterCommanderCommandSet();
    }

    execute(...args: any): void {
        let argumentsMap: Map<string, string> = this.buildArguments(...args);
        let optionsMap: Map<string, string> = this.buildOptions(...args);
        this.doExecute(argumentsMap, optionsMap);
    }

    abstract doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void;

    afterCommanderCommandSet(): void {
        //will be overridden - TODO: is this needed?
    }


}