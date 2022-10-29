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
var BaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_express_utils_1 = require("inversify-express-utils");
const ResponseUtils_1 = __importDefault(require("@pbb/utils/ResponseUtils"));
const express_validator_1 = require("express-validator");
let BaseController = BaseController_1 = class BaseController {
    constructor() { }
    validateRequest(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            ResponseUtils_1.default.send(res, 422, errors.array()[0].msg, errors);
            return false;
        }
        return true;
    }
    paginateParams(request) {
        const page = request.query.page ? +request.query.page : BaseController_1.DEFAULT_PAGE;
        const perPage = request.query.perPage ? +request.query.perPage : BaseController_1.DEFAULT_PER_PAGE;
        return { page, perPage };
    }
};
BaseController.DEFAULT_PAGE = 1;
BaseController.DEFAULT_PER_PAGE = 20;
__decorate([
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Boolean)
], BaseController.prototype, "validateRequest", null);
BaseController = BaseController_1 = __decorate([
    (0, inversify_express_utils_1.controller)(''),
    __metadata("design:paramtypes", [])
], BaseController);
exports.default = BaseController;
