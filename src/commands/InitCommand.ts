import {inject, injectable} from "inversify";
import {ProjectBuilder} from "../core/ProjectBuilder";
import {args, CommandBase, commandName, description, options, usage} from "ike/out/CommandBase";
import {LocalFile} from "../utilities/LocalFile";

@injectable()
@commandName("init")
@args([])
@options(
    [
        {"name":"path", "flag": "-p, --path <path>", description: "custom path"},
        {"name":"projectName", "flag": "-n, --projectName <projectName>", description: "name of the project"}
    ]
)
@usage("ike init")
@description("init a scripting project that will contain your scripts.")

export class InitCommand extends CommandBase {

    private static DEFAULT_PROJECT_NAME = "IkeScripts";

    doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): void {
        let path = optionValues.get("path") || "../";
        let name = optionValues.get("projectName") || InitCommand.DEFAULT_PROJECT_NAME;
        let projectBuilder:ProjectBuilder = new ProjectBuilder(path);
        console.log(name);
        let projectFolder:LocalFile = projectBuilder.create(path, name);
        projectBuilder.installDependencies(projectFolder);
        //write in ProjectsDao
    }


}