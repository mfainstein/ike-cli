import {requiredArgs, CommandBase, commandName, description, usage} from "ike-framework/out/CommandBase";
import {injectable} from "inversify";
import * as Mustache from 'mustache';
import {LocalFile} from "../utilities/LocalFile";
import {TextFiles} from "../utilities/TextFiles";
import {Files} from "../utilities/Files";

@injectable()
@commandName("create")
@requiredArgs(["name"])
@description("Create an executable command.")
@usage("ike create")
export class CreateCommand extends CommandBase {

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {

        let commandNameToCreate: string = argumentValues.get("name") || "";
        if (commandNameToCreate == "") {
            throw new Error("Please provide a command name!");
        }
        let className = commandNameToCreate + "Command";

        let commandView: any = {
            name: commandNameToCreate.toLowerCase(),
            className: className
        };

        let template: string = TextFiles.read(Files.file("./templates/simple_command.template"));

        let classContents: string = Mustache.render(template, commandView);
        TextFiles.write(Files.file("../IkeScripts/src/"+commandNameToCreate+".ts"), classContents);

    }

}