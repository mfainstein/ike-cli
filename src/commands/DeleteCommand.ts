import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {stage} from "ike-framework/out/core/CommandBase";
import {inject} from "inversify";
import {Types} from "../Types";
import {ProjectsDao} from "../services/dal/ProjectsDao";
import {ExecutableCommandsDao} from "../services/dal/ExecutableCommandsDao";
import {Command} from "ike-framework/out/core/Command";
import {ExecutableCommand} from "../core/ExecutableCommand";


export class DeleteCommand extends CommandBaseAsync {
    constructor(@inject(Types.ExecutableCommandsDao) private executableCommandsDao: ExecutableCommandsDao) {
        super();
    }


    @stage("Deleting...")
    private async prepare(argumentsMap: Map<string, string>): Promise<void> {
        let commandNameToDelete: string = argumentsMap.get("name") || ""; //TODO: better handling needed...
        //let command:ExecutableCommand = this.executableCommandsDao.get(commandNameToDelete);

    }



}
