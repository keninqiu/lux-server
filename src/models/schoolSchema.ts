import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ISchool {
    name: string,
    category: string,
    url: string,
    city: string,
    rawData?: any,
    compensation: {
        hourlyRate: {
            10: string,
            25: string,
            50: string,
            75: string,
            90: string,
            profileCount: string
        },
        salary: {
            10: string,
            25: string,
            50: string,
            75: string,
            90: string,
            profileCount: string
        },
    }
}
export interface School extends Document {
    name: string,
    category: string,
    url: string,
    city: string,
    rawData: any,
    compensation: {
        hourlyRate: {
            10: string,
            25: string,
            50: string,
            75: string,
            90: string,
            profileCount: string
        },
        salary: {
            10: string,
            25: string,
            50: string,
            75: string,
            90: string,
            profileCount: string
        },
    }    
}
const SchoolSchema = new Schema<School>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    url: String,
    rawData: Object,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    compensation: {
        hourlyRate: {
            10: Number,
            25: Number,
            50: Number,
            75: Number,
            90: Number,
            profileCount: Number
        },
        salary: {
            10: Number,
            25: Number,
            50: Number,
            75: Number,
            90: Number,
            profileCount: Number
        },
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
export const SchoolModel = model<School>("School", SchoolSchema);