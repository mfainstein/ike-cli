import {Files} from "../utilities/Files";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {IkeFile} from "../utilities/IkeFile";

export class ProjectBuilder {

    constructor(path: string) {

    }

    validate(path: string): void {
        //TODO: here will validate this is an empty folder
    }

    create(path: string, name: string): IkeFile {
        let projectFolder: IkeFile = Files.file(path, name);
        Files.mkdir(projectFolder);
        Files.mkdir(Files.file(projectFolder, "src"));
        return projectFolder;
        //ProcessUtils.execSync("npm install ike -- save", projectFolder)
    }

    installDependencies(projectFolder: IkeFile): void {
        ProcessUtils.execSync("npm init -y", projectFolder);
        ProcessUtils.execSync("npm install typescript --save-dev", projectFolder);
    }


}