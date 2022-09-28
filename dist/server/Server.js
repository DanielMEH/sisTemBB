"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appServer = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const Config_1 = require("../config/Config");
const UserAuthenticationData_1 = require("../router/UserAuthenticationData");
const path_1 = __importDefault(require("path"));
function Serveronfig() {
    appServer.use("port", Config_1.PORT || 4000);
    appServer.use((0, cors_1.default)());
    appServer === null || appServer === void 0 ? void 0 : appServer.use(express_1.default.urlencoded({ extended: true }));
    appServer.use(express_1.default.json());
    appServer.set("views", path_1.default.join(__dirname, "views"));
    appServer.use(UserAuthenticationData_1.newRouterUser.AuthenticationRouterUser);
    appServer.listen(appServer.get("port"), () => {
        console.log("Estas conectado en el puerto: ", appServer.get("port"));
    });
}
Serveronfig();
