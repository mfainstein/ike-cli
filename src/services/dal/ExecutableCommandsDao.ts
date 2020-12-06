import {ExecutableCommand} from "../../core/ExecutableCommand";

export interface ExecutableCommandsDao {
    getAll(): Promise<ExecutableCommand[]>;

    add(command: ExecutableCommand): Promise<void>;

    get(commandName: string): Promise<ExecutableCommand>;

    remove(commandName: string): Promise<void>;
}
