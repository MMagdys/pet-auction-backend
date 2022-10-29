"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RepositoryTypes = {
    IUserRepository: Symbol.for('IUserRepository'),
    IAuctionRepository: Symbol.for('IAuctionRepository'),
    IBidRepository: Symbol.for('IBidRepository'),
};
exports.default = RepositoryTypes;
