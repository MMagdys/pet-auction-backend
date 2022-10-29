"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../ModelNames"));
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Category = (0, mongoose_1.model)(ModelNames_1.default.Category, CategorySchema);
exports.default = Category;
