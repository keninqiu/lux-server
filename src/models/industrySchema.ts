import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IIndustry {
    name: string,
    url: string,
    category: string,
}
export interface Industry extends Document {
    name: string,
    url: string,
    category: string,
}
const IndustrySchema = new Schema<Industry>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    url: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    updatedAt: {
        type: Date
    }
});
export const IndustryModel = model<Industry>("Industry", IndustrySchema);