import { Document, Model, Types } from 'mongoose';


export interface IBidProps {
    _id?: Types.ObjectId;
    user: string;
    auction: string;
    amount: number;
}

export interface IBidDocument extends IBidProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IBidModel extends Model<IBidDocument> { }
