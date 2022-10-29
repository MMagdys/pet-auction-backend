import { model, Schema } from 'mongoose';
import ModelNames from '../ModelNames';

import IAuctionModel, { IAuctionDocument } from './IAuction';

const AuctionSchema: Schema = new Schema({  
    pet: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.Pet
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.User
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
}, { timestamps: true });


const Auction: IAuctionModel = model<IAuctionDocument, IAuctionModel>(ModelNames.Auction, AuctionSchema);

export default Auction;