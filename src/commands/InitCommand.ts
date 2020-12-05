import {inject, injectable} from "inversify";
import {ProjectBuilder} from "../core/projects/ProjectBuilder";
import {requiredArgs, CommandBase, commandName, description, options, usage} from "ike-framework/out/core/CommandBase";
import {ProjectsDao} from "../services/dal/ProjectsDao";
import {Types} from "../Types";
import {Project} from "../core/projects/Project";
import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {LocalFile} from "../utilities/LocalFile";
import {Files} from "../utilities/Files";

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

    private resolveCacheFolder(project:Project):LocalFile {
        let projectAbsolutePath:string =Files.file(project.srcFolderPath).getAbsolutePath();
        return Files.file("/node_modules/ts-import/cache/", projectAbsolutePath);
    }


    /**
     * TODO: there should be a whole project watcher daemon service...
     */
    async setup(): Promise<void> {
        let project:Project;
        try{
            project = await this.projectsDao.getCurrentProject();
            let projectFolder:LocalFile = Files.file(project.parentFolderPath, project.name);
            let scriptFile:LocalFile = Files.file(projectFolder, "tscWatch.js");
            let lockFile:LocalFile = Files.file(projectFolder, "TSC_WATCH_LOCK");
            let cache:LocalFile = this.resolveCacheFolder(project);
            if (lockFile.exists()){
                return;
            }

            let spawn = require('child_process').spawn;
            spawn('node', [scriptFile.getAbsolutePath(), cache.getAbsolutePath()], {
                cwd: projectFolder.getAbsolutePath(),
                stdio: 'ignore',
                detached: true
            }).unref();
        }
        catch (e) {
            //do nothing
        }

    }

    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        let path = optionValues.get("path") || ".";
        let name = optionValues.get("projectName") || InitCommand.DEFAULT_PROJECT_NAME;
        let relativePath = Files.relativePath(Files.getRootPath(), Files.file(process.cwd(), path).getPath());
        let project:Project = new ProjectBuilder(name, relativePath)
            .createFolders()
            .copyAddons()
            .installDependencies()
            .initTypescriptCompiler()
            .finalize();

        await this.projectsDao.addProject(project);
        await this.projectsDao.setCurrentProject(project.name);

    }


}
