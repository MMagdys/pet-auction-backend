"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValidator_1 = require("./BaseValidator");
const Validate_1 = __importDefault(require("./Validate"));
class AuctionValidator extends BaseValidator_1.BaseValidator {
}
exports.default = AuctionValidator;
AuctionValidator.placeBid = [
    Validate_1.default.body('amount', 'amount').required().isInt().apply(),
];
