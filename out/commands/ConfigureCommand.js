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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureCommand = void 0;
var inversify_1 = require("inversify");
var CommandBase_1 = require("../core/CommandBase");
var ConfigureCommand = /** @class */ (function (_super) {
    __extends(ConfigureCommand, _super);
    function ConfigureCommand() {
        var _this = _super.call(this) || this;
        _this.name = "configure";
        _this.arguments = [];
        _this.description = "configure ";
        _this.options = [];
        _this.usage = "ike configure";
        return _this;
    }
    ConfigureCommand.prototype.doExecute = function (argumentValues, optionValues) {
    };
    ConfigureCommand = __decorate([
        inversify_1.injectable()
    ], ConfigureCommand);
    return ConfigureCommand;
}(CommandBase_1.CommandBase));
exports.ConfigureCommand = ConfigureCommand;
