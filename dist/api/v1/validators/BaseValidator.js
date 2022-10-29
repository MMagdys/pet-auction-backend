"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseValidator = void 0;
const Validate_1 = __importDefault(require("./Validate"));
class BaseValidator {
    static page() {
        return Validate_1.default.query('page', 'Page').optional().isInt({ min: 1 }).apply();
    }
    static perPage() {
        return Validate_1.default.query('perPage', 'Per Page').optional().isInt({ min: 0 }).apply();
    }
}
exports.BaseValidator = BaseValidator;
BaseValidator.pagination = [
    BaseValidator.page(),
    BaseValidator.perPage()
];
