import {requiredArgs, CommandBase, commandName, description, usage} from "ike-framework/out/CommandBase";
import {inject, injectable} from "inversify";
import * as Mustache from 'mustache';
import {LocalFile} from "../utilities/LocalFile";
import {TextFiles} from "../utilities/TextFiles";
import {Files} from "../utilities/Files";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {ExecutableCommand} from "../core/ExecutableCommand";
import {CommandBaseAsync} from "ike-framework/out/CommandBaseAsync";
import {Types} from "../Types";
import {ProjectsDao} from "../services/dal/ProjectsDao";
import {Project} from "../core/projects/Project";
import {ExecutableCommandsDao} from "../services/dal/ExecutableCommandsDao";
import {tsImport} from "ts-import";

@injectable()
@commandName("create")
@requiredArgs(["name"])
@description("Create an executable command.")
@usage("ike create")
export class CreateCommand extends CommandBaseAsync {

    constructor(@inject(Types.ProjectsDao) private projectsDao:ProjectsDao,
                @inject(Types.ExecutableCommandsDao) private executableCommandsDao:ExecutableCommandsDao) {
        super();
    }

    //TODO: move to TextUtils/StringUtils
    private capitalizeFirstLetter(name:string):string{
        return name.charAt(0).toUpperCase() + name.slice(1);
    }


    async doExecute(argumentValues: Map<string, string>, optionValues: Map<string, string>): Promise<void> {

        let commandNameToCreate: string = argumentValues.get("name") || "";
        if (commandNameToCreate == "") {
            throw new Error("Please provide a command name!");
        }
        let className = this.capitalizeFirstLetter(commandNameToCreate) + "Command";

        let commandView: any = {
            name: commandNameToCreate.toLowerCase(),
            className: className
        };

        //TODO: TemplatesManager should handle this
        let template: string = TextFiles.read(Files.file("./templates/simple_command.template"));

        let classContents: string = Mustache.render(template, commandView);
        let project:Project;
        try {
            project = await this.projectsDao.getCurrentProject();
        }
        catch (e) {
            throw new Error("No projects available. Use ike init <projectName> in the desired path to setup a project")
        }
        //TODO: probably the Project should be a class with getSourceFolder and so on, for the ProjectBuilder to set.
        let commandFile:LocalFile = Files.file(Files.file(project.folderPath, project.name), "src/"+className+".ts");
        let executableCommand:ExecutableCommand = {className: className, name:commandNameToCreate, path:commandFile.getAbsolutePath()};
        TextFiles.write(commandFile, classContents);
        //TODO: should move to a utility - is this needed?
        //await tsImport.compile(executableCommand.path);
        await this.executableCommandsDao.add(executableCommand);
        //TODO: should move to a utility
        ProcessUtils.execSync("idea "+commandFile.getAbsolutePath(), Files.file(__dirname));
    }

}