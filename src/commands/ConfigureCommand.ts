import {inject, injectable} from "inversify";
import {CommandBase} from "ike-framework/out/CommandBase";


@injectable()
export class ConfigureCommand extends CommandBase {

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
    }


}