import {ExecutableCommand} from "../../core/ExecutableCommand";

export interface ExecutableCommandsDao {
    getAll(): Promise<ExecutableCommand[]>;

    add(command: ExecutableCommand): Promise<void>;
}