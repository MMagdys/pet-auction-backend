import { model, Schema } from 'mongoose';
import ModelNames from '../ModelNames';

import ICategoryModel, { ICategoryDocument } from './ICategory';

const CategorySchema: Schema = new Schema({  
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true });


const Category: ICategoryModel = model<ICategoryDocument, ICategoryModel>(ModelNames.Category, CategorySchema);

export default Category;