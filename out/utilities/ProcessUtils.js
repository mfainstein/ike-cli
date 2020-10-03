"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessUtils = void 0;
var ProcessUtils = /** @class */ (function () {
    function ProcessUtils() {
    }
    ProcessUtils.execSyncRedirectOutput = function (command, workingDir, shouldReturnOutput) {
        if (workingDir) {
            var process_1 = require("process");
            process_1.chdir(workingDir.getAbsolutePath());
        }
        var execSync = require("child_process").execSync;
        if (shouldReturnOutput) {
            return execSync(command);
        }
        return execSync(command, { stdio: [0, 1, 2] });
    };
    ProcessUtils.execSync = function (command, workingDir) {
        if (workingDir) {
            var process_2 = require("process");
            process_2.chdir(workingDir.getAbsolutePath());
        }
        var execSync = require("child_process").execSync;
        return execSync(command);
    };
    return ProcessUtils;
}());
exports.ProcessUtils = ProcessUtils;
