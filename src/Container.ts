import "reflect-metadata";
import {Container, decorate, injectable} from "inversify";

import {Types} from "./Types";
import {ConfigureCommand} from "./commands/misc/ConfigureCommand";
import {CommandsParser} from "./core/CommandsParser";
import {IkeCli} from "./IkeCli";
import {CommandsRegistry} from "./registries/CommandsRegistry";
import {CommandsRegistryImpl} from "./registries/CommandsRegistryImpl";
import {InitCommand} from "./commands/projects/InitCommand";
import {ExecuteCommand} from "./commands/executables/ExecuteCommand";
import {Command} from "ike-framework/out/core/Command";
import {CommandBase} from "ike-framework/out/core/CommandBase";
import {CreateExecutableCommand} from "./commands/executables/CreateCommand";
import {LevelUpDatabase} from "./infra/storage/LevelUpDatabase";
import {KeyValueDatabase} from "./infra/storage/KeyValueDatabase";
import {ProjectsDao} from "./services/dal/ProjectsDao";
import {ProjectsDaoKeyValue} from "./infra/dal/ProjectsDaoKeyValue";
import {ExecutableCommandsDao} from "./services/dal/ExecutableCommandsDao";
import {ExecutableCommandsDaoKeyValue} from "./infra/dal/ExecutableCommandsDaoKeyValue";
import {CommandBaseSync} from "ike-framework/out/core/CommandBaseSync";
import {CommandBaseAsync} from "ike-framework/out/core/CommandBaseAsync";
import {RemoveExecutableCommand} from "./commands/executables/RemoveCommand";

const container = new Container();

//decorate the imported CommandBase
decorate(injectable(), CommandBase);
decorate(injectable(), CommandBaseSync);
decorate(injectable(), CommandBaseAsync);

//TODO: separate to a three different containers: App, Domain ?, Infra

//commands
container.bind<Command>(Types.Command).to(ConfigureCommand);
container.bind<Command>(Types.Command).to(InitCommand);
container.bind<Command>(Types.Command).to(ExecuteCommand);
container.bind<Command>(Types.Command).to(CreateExecutableCommand);
container.bind<Command>(Types.Command).to(RemoveExecutableCommand);

container.bind<CommandsParser>(Types.CommandsParser).to(IkeCli);
container.bind<CommandsRegistry>(Types.CommandsRegistry).to(CommandsRegistryImpl);
container.bind<ProjectsDao>(Types.ProjectsDao).to(ProjectsDaoKeyValue);
container.bind<ExecutableCommandsDao>(Types.ExecutableCommandsDao).to(ExecutableCommandsDaoKeyValue);


//infra
container.bind<KeyValueDatabase>(Types.KeyValueDatabase).to(LevelUpDatabase).inSingletonScope();
export {container};
