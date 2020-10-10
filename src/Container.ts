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
import {Command} from "ike-framework/out/Command";
import {CommandBase} from "ike-framework/out/CommandBase";
import {CreateCommand} from "./commands/CreateCommand";
import {LevelUpDatabase} from "./infra/storage/LevelUpDatabase";
import {KeyValueDatabase} from "./infra/storage/KeyValueDatabase";
import {ProjectsDao} from "./services/dal/ProjectsDao";
import {ProjectsDaoKeyValue} from "./infra/dal/ProjectsDaoKeyValue";
import {ExecutableCommandsDao} from "./services/dal/ExecutableCommandsDao";
import {ExecutableCommandsDaoKeyValue} from "./infra/dal/ExecutableCommandsDaoKeyValue";

const container = new Container();

//decorate the imported CommandBase
decorate(injectable(), CommandBase);

//TODO: separate to a three different containers: App, Domain ?, Infra

//commands
container.bind<Command>(Types.Command).to(ConfigureCommand);
container.bind<Command>(Types.Command).to(InitCommand);
container.bind<Command>(Types.Command).to(ExecuteCommand);
container.bind<Command>(Types.Command).to(CreateCommand);

container.bind<CommandsParser>(Types.CommandsParser).to(IkeCli);
container.bind<CommandsRegistry>(Types.CommandsRegistry).to(CommandsRegistryImpl);
container.bind<ProjectsDao>(Types.ProjectsDao).to(ProjectsDaoKeyValue);
container.bind<ExecutableCommandsDao>(Types.ExecutableCommandsDao).to(ExecutableCommandsDaoKeyValue);


//infra
container.bind<KeyValueDatabase>(Types.KeyValueDatabase).to(LevelUpDatabase).inSingletonScope();
export {container};