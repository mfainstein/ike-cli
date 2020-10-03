import {Command} from "../core/Command";
import {CommandOption} from "../core/CommandOption";
import {inject, injectable} from "inversify";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {CommandBase} from "../core/CommandBase";
import {ProjectBuilder} from "../core/ProjectBuilder";
import {IkeFile} from "../utilities/IkeFile";

@injectable()
export class InitCommand extends CommandBase {
    name: string;
    arguments: string[];
    description: string;
    options: CommandOption[];
    usage: string;

    private static DEFAULT_PROJECT_NAME = "IkeScripts";

    constructor() {
        super();
        this.name = "init";
        this.description = "init a scripting project";
        this.usage = "ike init";

        this.arguments = [];
        this.options = [{"name":"path", "flag": "-p, --path <path>", description: "custom path"}];
        this.options = [{"name":"projectName", "flag": "-n, --projectName <projectName>", description: "name of the project"}];

    }

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
        let path = optionValues.get("path") || "../";
        let name = optionValues.get("projectName") || InitCommand.DEFAULT_PROJECT_NAME;
        let projectBuilder:ProjectBuilder = new ProjectBuilder(path);
        let projectFolder:IkeFile = projectBuilder.create(path, name);
        projectBuilder.installDependencies(projectFolder);
        //write in ProjectsDao
    }


}