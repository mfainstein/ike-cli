import "reflect-metadata";
import {Container} from "inversify";
import {Command} from "./core/Command";
import {Types} from "./Types";
import {ConfigureCommand} from "./commands/ConfigureCommand";
import {CommandsParser} from "./core/CommandsParser";
import {IkeCli} from "./IkeCli";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {CommandsRegistryImpl} from "./registries/CommandsRegistryImpl";
import {InitCommand} from "./commands/InitCommand";
import {ExecuteCommand} from "./commands/ExecuteCommand";

const container = new Container();

//commands
container.bind<Command>(Types.Command).to(ConfigureCommand);
container.bind<Command>(Types.Command).to(InitCommand);
container.bind<Command>(Types.Command).to(ExecuteCommand);

container.bind<CommandsParser>(Types.CommandsParser).to(IkeCli);
container.bind<CommandsRegistry>(Types.CommandsRegistry).to(CommandsRegistryImpl);

export {container};