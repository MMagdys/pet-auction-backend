"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
class Validate {
    constructor(builder, name) {
        this.builder = builder;
        this.name = name;
    }
    static body(path, name) {
        const builder = (0, express_validator_1.body)(path);
        return new Validate(builder, name);
    }
    static query(path, name) {
        const builder = (0, express_validator_1.query)(path);
        return new Validate(builder, name);
    }
    // delegated
    isLength(options) {
        const message = this.name + ' should be between ' + options.min + ' and ' + options.max + ' characters';
        this.builder.isLength(options).withMessage(message);
        return this;
    }
    // delegated
    isEmail() {
        this.builder.isEmail();
        return this;
    }
    // delegated
    optional() {
        this.builder.optional();
        return this;
    }
    // delegated
    isInt(options) {
        this.builder.isInt(options);
        return this;
    }
    // delegated
    isDate(options) {
        this.builder.isDate(options);
        return this;
    }
    required() {
        this.builder.not().isEmpty().withMessage('Required, ' + this.name);
        return this;
    }
    validPassword() {
        return this.isLength({ min: 8, max: 32 });
    }
    enum(enumType) {
        this.builder.isIn(Object.values(enumType));
        return this;
    }
    validId() {
        this.builder.custom((value) => {
            if (!mongoose_1.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid Id, ' + this.name);
            }
            return true;
        });
        return this;
    }
    apply() {
        return this.builder;
    }
}
exports.default = Validate;
