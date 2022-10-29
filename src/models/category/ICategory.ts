import { Document, Model, Types } from 'mongoose';


export interface ICategoryProps {
    _id?: Types.ObjectId;
    name: string;
}

export interface ICategoryDocument extends ICategoryProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ICategoryModel extends Model<ICategoryDocument> { }
