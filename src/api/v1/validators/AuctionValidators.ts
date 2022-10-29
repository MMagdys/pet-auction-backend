import { BaseValidator } from './BaseValidator';
import Validate from './Validate';


export default class AuctionValidator extends BaseValidator {


    public static placeBid = [
		Validate.body('amount', 'amount').required().isInt().apply(),
    ];

}