import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {commandName, description, options, requiredArgs, stage, usage} from "ike-framework/out/core/CommandBase";
import {inject, injectable} from "inversify";
import {Types} from "../Types";
import {ProjectsDao} from "../services/dal/ProjectsDao";
import {ExecutableCommandsDao} from "../services/dal/ExecutableCommandsDao";
import {Command} from "ike-framework/out/core/Command";
import {ExecutableCommand} from "../core/ExecutableCommand";
import {Files} from "../utilities/Files";
import {LocalFile} from "../utilities/LocalFile";

@injectable()
@commandName("remove")
@requiredArgs(["name"])
@options([])
@description("Remove a command.")
@usage("ike remove")
export class RemoveCommand extends CommandBaseAsync {
    constructor(@inject(Types.ExecutableCommandsDao) private executableCommandsDao: ExecutableCommandsDao) {
        super();
    }


    @stage("Preparing to remove...")
    private async prepare(argumentsMap: Map<string, string>): Promise<void> {
        let commandNameToDelete: string | undefined = argumentsMap.get("name"); //TODO: better handling needed...
        if (!commandNameToDelete) {
            throw new Error("Fatal! Command name is required!");
        }

        //validate command existence in dao
        let command: ExecutableCommand = await this.executableCommandsDao.get(commandNameToDelete);
        if (!command) {
            throw new Error("Could not find command with name " + commandNameToDelete);
        }

        //validate command path
        let path: string = command.path;
        let fileToDelete: LocalFile = Files.file(path);
        if (!fileToDelete.exists()) {
            throw new Error("Fatal error when removing command " + command.name);

        }

        this.storeValue("commandToDelete", command);

    }

    @stage("Removing...")
    private async delete() {
        let commandToDelete: ExecutableCommand = this.getValue("commandToDelete");
        let path: string = commandToDelete.path;
        let fileToDelete: LocalFile = Files.file(path);

        //remove from dao
        await this.executableCommandsDao.remove(commandToDelete.name);

        //delete the file
        Files.delete(fileToDelete);

    }


}
