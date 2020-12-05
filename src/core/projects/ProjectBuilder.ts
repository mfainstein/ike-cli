import {Files} from "../../utilities/Files";
import {ProcessUtils} from "../../utilities/ProcessUtils";
import {LocalFile} from "../../utilities/LocalFile";
import {Project} from "./Project";

export class ProjectBuilder {
    private project: Project;

    constructor(name: string, folderPath: string) {
        this.validate(folderPath);
        this.project = {name: name, parentFolderPath:folderPath}
    }

    validate(path: string): void {
        //TODO: here will validate this is an empty folder
    }

    private getProjectFolder():LocalFile {
        return Files.file(this.project.parentFolderPath, this.project.name);
    }

    public copyAddons(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        Files.copyFile(Files.file("addons/tscWatch.js"), Files.file(projectFolder, "tscWatch.js"));
        return this;
    }

    createFolders(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        let srcFolder:LocalFile = Files.file(projectFolder, "src/");
        Files.mkdir(projectFolder);
        Files.mkdir(srcFolder);
        this.project.srcFolderPath = srcFolder.getPath();
        return this;
    }

    installDependencies(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        ProcessUtils.execSync("npm init -y", projectFolder);
        ProcessUtils.execSync("npm install typescript --save-dev", projectFolder);
        //TODO: this is about to be simply 'npm install ike-framework' once published
        ProcessUtils.execSync("npm install ike-framework --save", projectFolder);
        return this;

    }

    initTypescriptCompiler(): ProjectBuilder {
        let projectFolder:LocalFile = this.getProjectFolder();
        ProcessUtils.execSync("tsc --init --experimentalDecorators", projectFolder);
        return this;
    }

    finalize(): Project {
        return this.project;
    }


}
