import {Project} from "../../core/projects/Project";

export interface ProjectsDao {
    addProject(project:Project): Promise<void>;

    getCurrentProjectName(): Promise<string>;

    getCurrentProject(): Promise<Project>;

    setCurrentProject(name: string): Promise<void>;

    getProject(name:string): Promise<Project>;

    getProjects(): Promise<Project[]>;
}