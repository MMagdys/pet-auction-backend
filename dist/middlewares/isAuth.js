"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const container_1 = __importDefault(require("@pbb/container"));
const types_1 = __importDefault(require("@pbb/container/types"));
const ResponseUtils_1 = __importDefault(require("@pbb/utils/ResponseUtils"));
const JwtHelper_1 = __importDefault(require("@pbb/helpers/JwtHelper"));
const passport_1 = __importDefault(require("passport"));
const authenticate = function (req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);
};
exports.authenticate = authenticate;
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = container_1.default.get(types_1.default.IUserRepository);
    const token = req.headers.authorization;
    if (!token) {
        return ResponseUtils_1.default.unauthorized(res);
    }
    const verifyResult = yield JwtHelper_1.default.verify(token);
    if (!verifyResult.valid || verifyResult.expired) {
        return ResponseUtils_1.default.unauthorized(res);
    }
    const decodedToken = verifyResult.decodedToken;
    const user = yield userRepository.findOne({
        filter: {
            _id: decodedToken.userId
        }
    });
    if (!user) {
        return ResponseUtils_1.default.unauthorized(res);
    }
    req.user = user;
    next();
});
exports.default = isAuth;
