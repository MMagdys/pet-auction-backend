import { Document, Model, Types } from 'mongoose';


export interface IAuctionProps {
    _id?: Types.ObjectId;
    pet: string;
    owner: string;
    startDate: Date;
    endDate: Date;
}

export interface IAuctionDocument extends IAuctionProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IAuctionModel extends Model<IAuctionDocument> { }
