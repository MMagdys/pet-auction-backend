const passportLocalMongoose = require('passport-local-mongoose');
import { model, Schema, PassportLocalSchema } from 'mongoose';
import ModelNames from '../ModelNames';

import IUserModel, { IUserDocument } from './IUser';

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    userStatus: {
        type: Number,
    },
    forgotPasswordToken: {
        type: String
    },
}, { timestamps: true });


UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });
const User: IUserModel = model<IUserDocument, IUserModel>(ModelNames.User, UserSchema as PassportLocalSchema);

export default User;
