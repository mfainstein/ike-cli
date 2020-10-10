import {inject, injectable} from "inversify";
import {CommandBase} from "ike-framework/out/CommandBase";
import {CommandBaseSync} from "ike-framework/out/CommandBaseSync";


@injectable()
export class ConfigureCommand extends CommandBaseSync {

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {

    }


}