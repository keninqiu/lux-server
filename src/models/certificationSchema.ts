import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICertification {
    name: string,
    namet?: string,
    category: string,
    url: string,
    slug?: string,
    salaryType?: string,
    ratings?: {
        overall: {
            profileCount: number,
            score: number
        }
    },
    rawData?: any,
    rawDataParsed?: boolean
}
export interface Certification extends Document {
    name: string,
    namet: string,
    category: Category,
    url: string,
    slug: string,
    salaryType: string,
    ratings: {
        overall: {
            profileCount: number,
            score: number
        }
    },
    rawData: any,
    rawDataParsed: boolean
}
const CertificationSchema = new Schema<Certification>({
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
        ref: 'Certification'
    },
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
            certification: {
                type: Schema.Types.ObjectId,
                ref: 'Certification'
            },
            name: String,
            url: String,
            min: Number,
            max: Number,
            avg: Number                
        }
    ],

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
                job: {
                    type: Schema.Types.ObjectId,
                    ref: 'Job'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],
        hourlyRateByJob: [
            {
                job: {
                    type: Schema.Types.ObjectId,
                    ref: 'Job'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],
        salaryByEmployer: [
            {
                employer: {
                    type: Schema.Types.ObjectId,
                    ref: 'Employer'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number               
            }
        ],
        hourlyRateByEmployer: [
            {
                employer: {
                    type: Schema.Types.ObjectId,
                    ref: 'Employer'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number               
            }
        ]  
    },
    ratings: {
        jobSatisfaction: {
            profileCount: Number,
            score: Number
        }
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    rawData: Object,
    rawDataParsed: Boolean,
    updatedAt: {
        type: Date
    }
});
export const CertificationModel = model<Certification>("Certification", CertificationSchema);