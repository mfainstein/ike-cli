import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";

import {Types} from "./Types";
import {ConfigureCommand} from "./commands/ConfigureCommand";
import {CommandsParser} from "./core/CommandsParser";
import {IkeCli} from "./IkeCli";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {CommandsRegistryImpl} from "./registries/CommandsRegistryImpl";
import {InitCommand} from "./commands/InitCommand";
import {ExecuteCommand} from "./commands/ExecuteCommand";
import {Command} from "ike/out/Command";
import {CommandBase} from "ike/out/CommandBase";
import {CreateCommand} from "./commands/CreateCommand";

const container = new Container();

//decorate the imported CommandBase
decorate(injectable(), CommandBase);

//commands
container.bind<Command>(Types.Command).to(ConfigureCommand);
container.bind<Command>(Types.Command).to(InitCommand);
container.bind<Command>(Types.Command).to(ExecuteCommand);
container.bind<Command>(Types.Command).to(CreateCommand);

container.bind<CommandsParser>(Types.CommandsParser).to(IkeCli);
container.bind<CommandsRegistry>(Types.CommandsRegistry).to(CommandsRegistryImpl);
export {container};