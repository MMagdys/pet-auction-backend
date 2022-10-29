import { model, Schema } from 'mongoose';
import ModelNames from '../ModelNames';

import IPetModel, { Status, IPetDocument } from './IPet';

const PetSchema: Schema = new Schema({  
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.Category
    },
    photoUrls: [{
        type: String
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: ModelNames.Tag
    }],
    status: {
        type: String,
        enum: Object.values(Status),
    }
}, { timestamps: true });


const Pet: IPetModel = model<IPetDocument, IPetModel>(ModelNames.Pet, PetSchema);

export default Pet;