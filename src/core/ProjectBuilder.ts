import {Files} from "../utilities/Files";
import {ProcessUtils} from "../utilities/ProcessUtils";
import {LocalFile} from "../utilities/LocalFile";

export class ProjectBuilder {

    constructor(path: string) {

    }

    validate(path: string): void {
        //TODO: here will validate this is an empty folder
    }

    create(path: string, name: string): LocalFile {
        let projectFolder: LocalFile = Files.file(path, name);
        Files.mkdir(projectFolder);
        Files.mkdir(Files.file(projectFolder, "src"));
        return projectFolder;
        //ProcessUtils.execSync("npm install ike -- save", projectFolder)
    }

    installDependencies(projectFolder: LocalFile): void {
        ProcessUtils.execSync("npm init -y", projectFolder);
        ProcessUtils.execSync("npm install typescript --save-dev", projectFolder);
    }


}