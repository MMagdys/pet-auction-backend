"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BidMapper_1 = __importDefault(require("@pbb/mappers/BidMapper"));
const MapperTypes_1 = __importDefault(require("./MapperTypes"));
class RepositoryInversify {
    static register(container) {
        container.bind(MapperTypes_1.default.IBidMapper).to(BidMapper_1.default);
    }
}
exports.default = RepositoryInversify;
