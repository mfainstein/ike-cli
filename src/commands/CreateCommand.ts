import {requiredArgs, CommandBase, commandName, description, usage} from "ike-framework/out/CommandBase";
import {injectable} from "inversify";
import * as Mustache from 'mustache';
import {LocalFile} from "../utilities/LocalFile";
import {TextFiles} from "../utilities/TextFiles";
import {Files} from "../utilities/Files";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {ExecutableCommand} from "../core/ExecutableCommand";
import {CommandBaseAsync} from "ike-framework/out/CommandBaseAsync";

@injectable()
@commandName("create")
@requiredArgs(["name"])
@description("Create an executable command.")
@usage("ike create")
export class CreateCommand extends CommandBaseAsync {

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {

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

        let commandFile:LocalFile = Files.file("../IkeScripts/src/"+className+".ts");
        let executableCommand:ExecutableCommand = {className: className, name:commandNameToCreate, path:commandFile.getAbsolutePath()}
        TextFiles.write(commandFile, classContents);
        ProcessUtils.execSync("idea /Users/markfainstein/PersonalDev/IkeScripts/src/HelloWorldCommand.ts", Files.file(__dirname));

    }

}