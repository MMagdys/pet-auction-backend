"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose_1 = require("mongoose");
const ModelNames_1 = __importDefault(require("../ModelNames"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fristName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    userStatus: {
        type: Number,
    },
    forgotPasswordToken: {
        type: String
    },
}, { timestamps: true });
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
const User = (0, mongoose_1.model)(ModelNames_1.default.User, UserSchema);
exports.default = User;
