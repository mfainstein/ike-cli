import {LocalFile} from "./LocalFile";

export class ProcessUtils {
    public static execSyncRedirectOutput(command: string, workingDir?:LocalFile, shouldReturnOutput?:boolean): Buffer {
        if (workingDir){
            let process = require("process");
            process.chdir(workingDir.getAbsolutePath())
        }
        let execSync = require("child_process").execSync;
        if (shouldReturnOutput){
            return execSync(command);
        }
        return execSync(command, {stdio: [0, 1, 2]});
    }

    public static execSync(command: string, workingDir?:LocalFile): Buffer {
        if (workingDir){
            let process = require("process");
            process.chdir(workingDir.getAbsolutePath())
        }
        let execSync = require("child_process").execSync;
        return execSync(command);
    }
}