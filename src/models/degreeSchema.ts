import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IDegree {
    name: string,
    category: string,
    url: string
}
export interface Degree extends Document {
    name: string,
    url: string,
    category: string
}
const DegreeSchema = new Schema<Degree>({
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
export const DegreeModel = model<Degree>("Degree", DegreeSchema);