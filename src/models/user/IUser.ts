import { Document, Model, Types } from 'mongoose';
import { PassportLocalDocument, PassportLocalModel } from "mongoose";


export interface IUserProps {
    _id?: Types.ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    userStatus?: number;
    forgotPasswordToken?: string;
}

export interface IUserDocument extends IUserProps, Document, PassportLocalDocument {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default interface IUserModel extends Model<IUserDocument>, PassportLocalModel<IUserDocument> { }
