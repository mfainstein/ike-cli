import {inject, injectable} from "inversify";
import {ProjectBuilder} from "../core/projects/ProjectBuilder";
import {requiredArgs, CommandBase, commandName, description, options, usage} from "ike-framework/out/CommandBase";
import {ProjectsDao} from "../services/dal/ProjectsDao";
import {Types} from "../Types";
import {Project} from "../core/projects/Project";
import {CommandBaseAsync} from "ike-framework/out/CommandBaseAsync";

@injectable()
@commandName("init")
@requiredArgs([])
@options(
    [
        {"name":"path", "flag": "-p, --path <path>", description: "custom path"},
        {"name":"projectName", "flag": "-n, --projectName <projectName>", description: "name of the project"}
    ]
)
@usage("ike init")
@description("init a scripting project that will contain your scripts.")

export class InitCommand extends CommandBaseAsync {

    private static DEFAULT_PROJECT_NAME = "IkeScripts";

    constructor(@inject(Types.ProjectsDao) private projectsDao:ProjectsDao) {
        super();
    }

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        let path = optionValues.get("path") || "../";
        let name = optionValues.get("projectName") || InitCommand.DEFAULT_PROJECT_NAME;
        let project:Project = new ProjectBuilder(name, path).create().installDependencies().finalize();

        this.projectsDao.addProject(project);
        this.projectsDao.setCurrentProject(project.name);

    }


}