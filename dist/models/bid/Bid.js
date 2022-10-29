"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../ModelNames"));
const BidSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ModelNames_1.default.User,
        required: true
    },
    auction: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ModelNames_1.default.Auction,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });
const Bid = (0, mongoose_1.model)(ModelNames_1.default.Bid, BidSchema);
exports.default = Bid;
