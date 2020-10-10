import {ProjectsDao} from "../../services/dal/ProjectsDao";
import {Project} from "../../core/projects/Project";
import {inject, injectable} from "inversify";
import {KeyValueDatabase} from "../storage/KeyValueDatabase";
import {Types} from "../../Types";
import {KeyValueDatabaseDimension} from "../storage/KeyValueDatabaseDimension";
import {Configuration} from "./Configuration";

@injectable()
export class ProjectsDaoKeyValue implements ProjectsDao {

    constructor(@inject(Types.KeyValueDatabase) private keyValueDatabase: KeyValueDatabase) {
    }

    async addProject(project: Project): Promise<void> {
        await this.keyValueDatabase.put(KeyValueDatabaseDimension.Projects, project, project.name)
    }

    async getCurrentProjectName(): Promise<string> {
        return await this.keyValueDatabase.get(KeyValueDatabaseDimension.Configuration, Configuration.CurrentProject);
    }

    async getProject(name: string): Promise<Project> {
        return await this.keyValueDatabase.get(KeyValueDatabaseDimension.Projects, name) as Project;
    }

    async setCurrentProject(name: string): Promise<void> {
        await this.keyValueDatabase.put(KeyValueDatabaseDimension.Configuration, name, Configuration.CurrentProject);
    }

    getProjects(): Promise<Project[]> {
        //TODO: implement
        throw new Error("Not Implemented");
    }

    async getCurrentProject(): Promise<Project> {
       let name:string = await this.getCurrentProjectName();
       return await this.keyValueDatabase.get(KeyValueDatabaseDimension.Projects, name);
    }

}