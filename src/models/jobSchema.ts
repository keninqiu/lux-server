import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IJob {
    name: string,
    url: string,
    category: string
}
export interface Job extends Document {
    name: string,
    url: string,
    category: string
}
const JobSchema = new Schema<Job>({
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
export const JobModel = model<Job>("Job", JobSchema);