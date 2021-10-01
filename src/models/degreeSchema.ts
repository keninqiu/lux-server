import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IDegree {
    name: string,
    category: string,
    url: string,
    slug?: string,
    salaryType?: string,
    rawData?: any
}
export interface Degree extends Document {
    name: string,
    url: string,
    slug: string,
    salaryType: string,
    category: Category,
    rawData: any
}
const DegreeSchema = new Schema<Degree>({
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
        ref: 'Degree'
    },
    url: String,
    slug: String,
    salaryType: String,
    rawData: Object,
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
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            earlyCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            midCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            lateCareer: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            },
            experienced: {
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number
            }
        },
        gender: {
            male: {
              profileCount: Number,
              min: Number,
              max: Number,
              avg: Number
            },
            female: {
              profileCount: Number,
              min: Number,
              max: Number,
              avg: Number
            }
        },        
        salaryByJob: [
            {
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ]
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
    ratings: {
        jobSatisfaction: {
            profileCount: Number,
            score: Number
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
export const DegreeModel = model<Degree>("Degree", DegreeSchema);