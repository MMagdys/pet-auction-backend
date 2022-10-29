"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@pbb/config"));
const types_1 = __importDefault(require("@pbb/container/types"));
const JwtHelper_1 = __importDefault(require("@pbb/helpers/JwtHelper"));
const UserRepository_1 = __importDefault(require("@pbb/repositories/UserRepository"));
const inversify_1 = require("inversify");
const rand_token_1 = require("rand-token");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    generateRefreshToken() {
        const payload = { refreshToken: (0, rand_token_1.uid)(256) };
        return JwtHelper_1.default.sign(payload, config_1.default.jwt.refreshTokenValidPeriod);
    }
    generateAccessToken(userId, expiresIn) {
        const payload = {
            userId: userId.toString(),
        };
        const expiringDate = expiresIn ? expiresIn : config_1.default.jwt.accessTokenValidPeriod;
        return JwtHelper_1.default.sign(payload, expiringDate);
    }
};
AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.IUserRepository)),
    __metadata("design:paramtypes", [UserRepository_1.default])
], AuthService);
exports.default = AuthService;
