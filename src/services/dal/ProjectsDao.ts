export interface ProjectsDao {
    addProject(name: string, path: string): void;

    getProject(name: string): void;
}