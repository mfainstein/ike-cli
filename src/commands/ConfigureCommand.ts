import {inject, injectable} from "inversify";
import {CommandBase} from "ike-framework/out/CommandBase";
import {CommandBaseSync} from "ike-framework/out/CommandBaseSync";


@injectable()
//TODO: add configuration for: project, compile/no compile
export class ConfigureCommand extends CommandBaseSync {


    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {

    }


}