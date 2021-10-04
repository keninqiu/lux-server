import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICountry {
    name: string,
    namet?: string,
    code: string,
    url: string,
    currencyCode: string,
    byDimension?: {
        salaryByJob: [
            {
                job: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByJob: [
            {
                job: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],  
        
        salaryByEmployer: [
            {
                employer: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByEmployer: [
            {
                employer: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],    
        
        salaryByDegree: [
            {
                degree: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByDegree: [
            {
                degree: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],

        salaryBySchool: [
            {
                school: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateBySchool: [
            {
                school: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
    },
    rawData?: any,
    rawDataParsed?: boolean
}
export interface Country extends Document {
    name: string,
    namet: string,
    code: string,
    url: string,
    currencyCode: string,
    byDimension: {
        salaryByJob: [
            {
                job: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByJob: [
            {
                job: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],  
        
        salaryByEmployer: [
            {
                employer: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByEmployer: [
            {
                employer: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],    
        
        salaryByDegree: [
            {
                degree: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateByDegree: [
            {
                degree: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],

        salaryBySchool: [
            {
                school: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
        hourlyRateBySchool: [
            {
                school: string,
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ],
    },
    rawData: any,
    rawDataParsed: boolean
}
const CountrySchema = new Schema<Country>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
    code: String,
    url: String,
    currencyCode: String,
    byDimension: {
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
        /*
        https://fact-service.rho.payscale.com/v1/Logo?entity=The%20Home%20Depot%20Inc.&source=crunchbase
        */
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
        ],    
        
        salaryByDegree: [
            {
                degree: {
                    type: Schema.Types.ObjectId,
                    ref: 'Degree'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],
        hourlyRateByDegree: [
            {
                degree: {
                    type: Schema.Types.ObjectId,
                    ref: 'Degree'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],

        salaryBySchool: [
            {
                school: {
                    type: Schema.Types.ObjectId,
                    ref: 'School'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],
        hourlyRateBySchool: [
            {
                school: {
                    type: Schema.Types.ObjectId,
                    ref: 'School'
                },
                name: String,
                url: String,
                profileCount: Number,
                min: Number,
                max: Number,
                avg: Number                
            }
        ],
    },
    rawData: Object,
    rawDataParsed: Boolean,
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    },
    updatedAt: {
        type: Date
    }
});
export const CountryModel = model<Country>("Country", CountrySchema);