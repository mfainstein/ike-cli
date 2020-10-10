import {Files} from "../../utilities/Files";
import {ProcessUtils} from "../../utilities/ProcessUtils";
import {LocalFile} from "../../utilities/LocalFile";
import {Project} from "./Project";

export class ProjectBuilder {
    private project: Project;

    constructor(name: string, folderPath: string) {
        this.validate(folderPath);
        this.project = {name: name, folderPath:folderPath}
    }

    validate(path: string): void {
        //TODO: here will validate this is an empty folder
    }

    private getProjectFolder():LocalFile {
        return Files.file(this.project.folderPath, this.project.name);
    }

    create(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        Files.mkdir(projectFolder);
        Files.mkdir(Files.file(projectFolder, "src"));
        return this;
    }

    installDependencies(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        ProcessUtils.execSync("npm init -y", projectFolder);
        ProcessUtils.execSync("npm install typescript --save-dev", projectFolder);
        //ProcessUtils.execSync("npm install ike-framework");
        return this;

    }

    finalize(): Project {
        return this.project;
    }


}