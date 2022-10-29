"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuctionService_1 = __importDefault(require("@pbb/services/AuctionService"));
const AuthService_1 = __importDefault(require("@pbb/services/AuthService"));
const HelperTypes_1 = __importDefault(require("./HelperTypes"));
class HelperInversify {
    static register(container) {
        container.bind(HelperTypes_1.default.IAuthService).to(AuthService_1.default);
        container.bind(HelperTypes_1.default.IAuctionService).to(AuctionService_1.default);
    }
}
exports.default = HelperInversify;
