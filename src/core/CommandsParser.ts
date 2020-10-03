import {Command} from "./Command";

export interface CommandsParser {

    description: string;

    installCommand(command: Command): void;

    initAutoCompletion(): void; //TODO: rename
    parse(): void;
}