import {Command} from "ike/out/Command";
export interface CommandsParser {

    description: string;

    installCommand(command: Command): Promise<void>;

    initAutoCompletion(): void; //TODO: rename
    parse(): void;
}