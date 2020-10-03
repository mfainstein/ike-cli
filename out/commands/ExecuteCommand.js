"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteCommand = void 0;
var CommandBase_1 = require("../core/CommandBase");
var inversify_1 = require("inversify");
var Commander = __importStar(require("commander"));
var ExecuteCommand = /** @class */ (function (_super) {
    __extends(ExecuteCommand, _super);
    function ExecuteCommand() {
        var _this = _super.call(this) || this;
        _this.description = "execute a command";
        _this.name = "execute";
        _this.usage = "ike execute <commandName>";
        _this.options = [];
        _this.arguments = ["commandName"];
        return _this;
    }
    ExecuteCommand.prototype.afterCommanderCommandSet = function () {
        _super.prototype.afterCommanderCommandSet.call(this);
        var command = Commander.program.command("test");
        command.description("baah");
        if (this.commanderCommand) {
            this.commanderCommand.addCommand(command);
        }
    };
    ExecuteCommand.prototype.doExecute = function (argumentValues, optionValues) {
    };
    ExecuteCommand = __decorate([
        inversify_1.injectable()
    ], ExecuteCommand);
    return ExecuteCommand;
}(CommandBase_1.CommandBase));
exports.ExecuteCommand = ExecuteCommand;
