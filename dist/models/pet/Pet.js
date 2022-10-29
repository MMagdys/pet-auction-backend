"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../ModelNames"));
const IPet_1 = require("./IPet");
const PetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: ModelNames_1.default.Category
    },
    photoUrls: [{
            type: String
        }],
    tags: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: ModelNames_1.default.Tag
        }],
    status: {
        type: String,
        enum: Object.values(IPet_1.Status),
    }
}, { timestamps: true });
const Pet = (0, mongoose_1.model)(ModelNames_1.default.Pet, PetSchema);
exports.default = Pet;
