import { Document, Model, Types } from 'mongoose';


export enum Status {
    AVAILABLE = "available",
    PENDING = "pending",
    SOLD = "sold",
}

export interface IPetProps {
    _id?: Types.ObjectId;
    name: string;
    photoUrls: string[];
    category: string[];
    tags: string[];
    status: Status;

}

export interface IPetDocument extends IPetProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IPetModel extends Model<IPetDocument>, Model<IPetDocument> { }
