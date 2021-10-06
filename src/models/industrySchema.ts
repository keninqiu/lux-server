import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IIndustry {
    name: string,
    namet?: string,
    url: string,
    slug?: string,
    salaryType?: string,
    category: string,
    rawData?: any,
    rawDataParsed?: boolean
}
export interface Industry extends Document {
    name: string,
    namet: string,
    url: string,
    slug: string,
    salaryType: string,
    category: Category,
    rawData: any,
    rawDataParsed: boolean
}
const IndustrySchema = new Schema<Industry>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
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
    rawDataParsed: Boolean,
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
            industry: {
                type: Schema.Types.ObjectId,
                ref: 'Industry'
            },           
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