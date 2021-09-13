import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICategory {
    name: string,
    type: string,
    url: string,
    country: string
}
export interface Category extends Document {
    name: string,
    type: string,
    url: string,
    country: string
}
const CategorySchema = new Schema<Category>({
    name: String,
    type: {
        type: String
    },
    url: String,
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    updatedAt: {
        type: Date
    }
});
export const CategoryModel = model<Category>("Category", CategorySchema);