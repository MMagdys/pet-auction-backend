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
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("@pbb/container/types"));
const BaseController_1 = __importDefault(require("./BaseController"));
const isAuth_1 = __importDefault(require("@pbb/middlewares/isAuth"));
const ResponseUtils_1 = __importDefault(require("@pbb/utils/ResponseUtils"));
const AuctionValidators_1 = __importDefault(require("../validators/AuctionValidators"));
let AuctionController = class AuctionController extends BaseController_1.default {
    constructor(auctionService, bidMapper) {
        super();
        this.auctionService = auctionService;
        this.bidMapper = bidMapper;
    }
    listBids(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateRequest(req, res)) {
                return;
            }
            const user = req.user;
            const userId = user._id.toString();
            const auctionId = req.params.auctionId;
            const bids = yield this.auctionService.getBidsList(userId, auctionId);
            if (!bids) {
                return ResponseUtils_1.default.unprocessable(res, 'Invalid options', {});
            }
            const mappedBids = yield Promise.all(bids.map((bid) => this.bidMapper.toDto(bid)));
            return ResponseUtils_1.default.ok(res, { bids: mappedBids });
        });
    }
    placeBid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.validateRequest(req, res)) {
                return;
            }
            const user = req.user;
            const userId = user._id.toString();
            const auctionId = req.params.auctionId;
            const amount = req.body.amount;
            const palcedBid = yield this.auctionService.addBid(userId, auctionId, amount);
            if (!palcedBid) {
                return ResponseUtils_1.default.unprocessable(res, 'Invalid options', {});
            }
            const mappedBid = yield this.bidMapper.toDto(palcedBid);
            return ResponseUtils_1.default.created(res, { bid: mappedBid });
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/:auctionId/bid'),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "listBids", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/:auctionId/bid', ...AuctionValidators_1.default.placeBid),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuctionController.prototype, "placeBid", null);
AuctionController = __decorate([
    (0, inversify_express_utils_1.controller)('/v1/auction', isAuth_1.default),
    __param(0, (0, inversify_1.inject)(types_1.default.IAuctionService)),
    __param(1, (0, inversify_1.inject)(types_1.default.IBidMapper)),
    __metadata("design:paramtypes", [Object, Object])
], AuctionController);
exports.default = AuctionController;
