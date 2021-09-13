import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IEmployer {
    name: string,
    url: string,
    category: string
}
export interface Employer extends Document {
    name: string,
    url: string,
    category: string
}
const EmployerSchema = new Schema<Employer>({
    name: String,
    url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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
export const EmployerModel = model<Employer>("Employer", EmployerSchema);