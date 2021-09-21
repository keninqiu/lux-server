import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICertification {
    name: string,
    category: string,
    url: string,
    slug?: string,
    salaryType?: string,
    rawData?: any
}
export interface Certification extends Document {
    name: string,
    category: Category,
    url: string,
    slug: string,
    salaryType: string,
    rawData: any
}
const CertificationSchema = new Schema<Certification>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    url: String,
    slug: String,
    salaryType: String,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    rawData: Object,
    updatedAt: {
        type: Date
    }
});
export const CertificationModel = model<Certification>("Certification", CertificationSchema);