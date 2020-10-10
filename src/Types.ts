import {ExecutableCommandsDao} from "./services/dal/ExecutableCommandsDao";

export const Types = {
    Command: Symbol.for("Command"),
    CommandsParser: Symbol.for("CommandsParser"),
    CommandsRegistry: Symbol.for("CommandsRegistry"),


    ProjectsDao: Symbol.for("ProjectsDao"),
    ExecutableCommandsDao: Symbol.for("ExecutableCommandsDao"),
    KeyValueDatabase: Symbol.for("KeyValueDatabase")

};