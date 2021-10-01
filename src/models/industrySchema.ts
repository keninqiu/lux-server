import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IIndustry {
    name: string,
    url: string,
    slug?: string,
    salaryType?: string,
    category: string,
    rawData?: any
}
export interface Industry extends Document {
    name: string,
    url: string,
    slug: string,
    salaryType: string,
    category: Category,
    rawData: any
}
const IndustrySchema = new Schema<Industry>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }
    ],
    duplicatedWith: {
        type: Schema.Types.ObjectId,
        ref: 'Industry'
    },
    rawData: Object,
    url: String,
    slug: String,
    salaryType: String,
    currencyCode: String,
    compensation: {
        bonus: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        commission: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        salary: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number
        },
        hourlyRate: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number            
        },
        profitSharing: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number              
        },
        total: {
            min: Number,
            max: Number,
            avg: Number,
            profileCount: Number              
        }
    }, 
    related: [
        {
            name: String,
            url: String,
            min: Number,
            max: Number,
            avg: Number                
        }
    ],
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