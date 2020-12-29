import {requiredArgs, CommandBase, commandName, description, usage, options} from "ike-framework/out/core/CommandBase";
import {inject, injectable} from "inversify";
import * as Mustache from 'mustache';
import {LocalFile} from "../../utilities/LocalFile";
import {TextFiles} from "../../utilities/TextFiles";
import {Files} from "../../utilities/Files";
import {ProcessUtils} from "../../utilities/ProcessUtils";
import {ExecutableCommand} from "../../core/ExecutableCommand";
import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {Types} from "../../Types";
import {ProjectsDao} from "../../services/dal/ProjectsDao";
import {Project} from "../../core/projects/Project";
import {ExecutableCommandsDao} from "../../services/dal/ExecutableCommandsDao";
import {tsImport} from "ts-import";
import {stage} from "ike-framework/out/core/CommandBase";


@injectable()
@commandName("create")
@requiredArgs(["name"])
@options([{name: "desc", description: "description for the command", flag: "-d, --desc <d>"}])
@description("Create an executable command.")
@usage("ike create")
export class CreateExecutableCommand extends CommandBaseAsync {

    constructor(@inject(Types.ProjectsDao) private projectsDao: ProjectsDao,
                @inject(Types.ExecutableCommandsDao) private executableCommandsDao: ExecutableCommandsDao) {
        super();
    }

    //============================================== Helpers ===========================================================

    //<editor-fold desc="Helpers" >
    //TODO: move to TextUtils/StringUtils
    private capitalizeFirstLetter(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //</editor-fold>

    //============================================== Stages ============================================================

    //<editor-fold desc="Stages" >
    @stage("Preparing...")
    private async prepare(argumentsMap: Map<string, string>, optionValues: Map<string, string>): Promise<void> {
        let commandNameToCreate: string | undefined = argumentsMap.get("name"); //TODO: better handling needed...
        if (!commandNameToCreate) {
            throw new Error("Fatal! Command name is required!");
        }
        let className: string = commandNameToCreate.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
        });
        className = this.capitalizeFirstLetter(className) + "Command";
        let commandDescription: string = optionValues.get("desc") || "no description for " + commandNameToCreate;

        let commandView: any = {
            name: commandNameToCreate.toLowerCase(),
            className: className,
            description: commandDescription
        };

        //TODO: TemplatesManager should handle this
        let templateFile: LocalFile = Files.file("./templates/simple_command.template");
        let template: string = TextFiles.read(templateFile);

        let classContents: string = Mustache.render(template, commandView);
        let project: Project;
        try {
            project = await this.projectsDao.getCurrentProject();
        } catch (e) {
            throw new Error("No projects available. Use ike init <projectName> in the desired path to setup a project")
        }
        let commandFile: LocalFile = Files.file(Files.file(project.parentFolderPath, project.name), "src/" + className + ".ts");

        this.storeValue("classContents", classContents);
        this.storeValue("commandNameToCreate", commandNameToCreate);
        this.storeValue("commandFile", commandFile);
        this.storeValue("className", className);
    }

    @stage("Blueprinting...")
    private async bluePrint(): Promise<void> {
        let className: string = this.getValue("className");
        let classContents: string = this.getValue("classContents");
        let commandFile: LocalFile = this.getValue("commandFile");
        let commandNameToCreate: string = this.getValue("commandNameToCreate");

        let executableCommand: ExecutableCommand = {
            className: className,
            name: commandNameToCreate,
            path: commandFile.getAbsolutePath()
        };
        TextFiles.write(commandFile, classContents);

        //TODO: should move to a utility - is this needed?
        await tsImport.compile(executableCommand.path);
        await this.executableCommandsDao.add(executableCommand);
    }

    @stage("Launching your favorite IDE...")
    private async launchIde(): Promise<void> {
        let commandFile: LocalFile = this.getValue("commandFile");
        //TODO: should get the command to launch the IDE from the user's config.
        ProcessUtils.execSync("idea " + commandFile.getAbsolutePath());
    }

    //</editor-fold>

}
