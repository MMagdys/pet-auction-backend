"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../ModelNames"));
const AuctionSchema = new mongoose_1.Schema({
    pet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ModelNames_1.default.Pet
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ModelNames_1.default.User
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });
const Auction = (0, mongoose_1.model)(ModelNames_1.default.Auction, AuctionSchema);
exports.default = Auction;
