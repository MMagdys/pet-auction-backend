import { model, Schema } from 'mongoose';
import ModelNames from '../ModelNames';

import ITagModel, { ITagDocument } from './ITag';

const TagSchema: Schema = new Schema({  
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Tag: ITagModel = model<ITagDocument, ITagModel>(ModelNames.Tag, TagSchema);

export default Tag;