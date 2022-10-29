import { Document, Model, Types } from 'mongoose';


export interface ITagProps {
    _id?: Types.ObjectId;
    name: string;
}

export interface ITagDocument extends ITagProps, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ITagModel extends Model<ITagDocument> { }
