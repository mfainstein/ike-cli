import {inject, injectable} from "inversify";
import {ExecutableCommandsDao} from "../../services/dal/ExecutableCommandsDao";
import {ExecutableCommand} from "../../core/ExecutableCommand";
import {KeyValueDatabase} from "../storage/KeyValueDatabase";
import {Types} from "../../Types";
import {KeyValueDatabaseDimension} from "../storage/KeyValueDatabaseDimension";

@injectable()
export class ExecutableCommandsDaoKeyValue implements ExecutableCommandsDao {
    constructor(@inject(Types.KeyValueDatabase) private keyValueDatabase: KeyValueDatabase) {
    }

    async getAll(): Promise<ExecutableCommand[]> {
        return await this.keyValueDatabase.getAll(KeyValueDatabaseDimension.ExecutableCommands)
    }

    async add(command: ExecutableCommand): Promise<void> {
        return await this.keyValueDatabase.put(KeyValueDatabaseDimension.ExecutableCommands, command, command.name);
    }

    async get(commandName: string): Promise<ExecutableCommand> {
        return await this.keyValueDatabase.get(KeyValueDatabaseDimension.ExecutableCommands, commandName);
    }

}
