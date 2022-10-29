import { model, Schema } from 'mongoose';
import ModelNames from '../ModelNames';

import IBidModel, { IBidDocument } from './IBid';

const BidSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.User,
        required: true
    },
    auction: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.Auction,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });


const Bid: IBidModel = model<IBidDocument, IBidModel>(ModelNames.Bid, BidSchema);

export default Bid;