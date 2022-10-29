import { body, param, query, ValidationChain } from 'express-validator';
import { Types } from 'mongoose';
import Validate from './Validate';

export class BaseValidator {

    public static pagination = [
        BaseValidator.page(),
        BaseValidator.perPage()
    ];

    private static page() {
        return Validate.query('page', 'Page').optional().isInt({ min: 1 }).apply();
    }

    protected static perPage() {
        return Validate.query('perPage', 'Per Page').optional().isInt({ min: 0 }).apply();
    }

}
