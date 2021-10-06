import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IEmployer {
    name: string,
    namet?: string,
    url: string,
    currencyCode: string,
    slug?: string,
    salaryType?: string,
    category: string,
    compensation: {
        bonus: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        commission: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        salary: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        hourlyRate: {
            min: number,
            max: number,
            avg: number,
            profileCount: number            
        },
        profitSharing: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        },
        total: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        }
    },  
    ratings?: {
        overall: {
            profileCount: number,
            score: number
        },
        appreciation: {
            profileCount: number,
            score: number
        },
        companyOutlook: {
            profileCount: number,
            score: number
        },
        fairPay: {
            profileCount: number,
            score: number
        },
        learningandDevelopment: {
            profileCount: number,
            score: number
        },
        managerCommunication: {
            profileCount: number,
            score: number
        },
        managerRelationship: {
            profileCount: number,
            score: number
        },
        payTransparency: {
            profileCount: number,
            score: number
        }
    },
    reviews?: [
        {
            answerBody: string,
            answerCon: string,
            answerPro: string,
            answerTitle: string,
            city: string,
            country: string,
            employer: string,
            jobTitle: string,
            questionId: number,
            questionPrompt: string,
            questionType: number,
            updated: Date
        }
    ],
    rawData?: any,
    rawDataParsed?: boolean
}
export interface Employer extends Document {
    name: string,
    namet: string,
    url: string,
    slug: string,
    currencyCode: string,
    salaryType: string,
    category: Category,
    compensation: {
        bonus: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        commission: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        salary: {
            min: number,
            max: number,
            avg: number,
            profileCount: number
        },
        hourlyRate: {
            min: number,
            max: number,
            avg: number,
            profileCount: number            
        },
        profitSharing: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        },
        total: {
            min: number,
            max: number,
            avg: number,
            profileCount: number              
        }
    },  
    ratings: {
        overall: {
            profileCount: number,
            score: number
        },
        appreciation: {
            profileCount: number,
            score: number
        },
        companyOutlook: {
            profileCount: number,
            score: number
        },
        fairPay: {
            profileCount: number,
            score: number
        },
        learningandDevelopment: {
            profileCount: number,
            score: number
        },
        managerCommunication: {
            profileCount: number,
            score: number
        },
        managerRelationship: {
            profileCount: number,
            score: number
        },
        payTransparency: {
            profileCount: number,
            score: number
        }
    },
    reviews?: [
        {
            answerBody: string,
            answerCon: string,
            answerPro: string,
            answerTitle: string,
            city: string,
            country: string,
            employer: string,
            jobTitle: string,
            questionId: number,
            questionPrompt: string,
            questionType: number,
            updated: Date
        }
    ],
    rawData: any,
    rawDataParsed: boolean
}
const EmployerSchema = new Schema<Employer>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
    url: String,
    slug: String,
    currencyCode: String,
    salaryType: String,
    rawData: Object,
    rawDataParsed: Boolean,
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
        ref: 'Employer'
    },
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
    ratings: {
        overall: {
            profileCount: Number,
            score: Number
        },
        appreciation: {
            profileCount: Number,
            score: Number
        },
        companyOutlook: {
            profileCount: Number,
            score: Number
        },
        fairPay: {
            profileCount: Number,
            score: Number
        },
        learningandDevelopment: {
            profileCount: Number,
            score: Number
        },
        managerCommunication: {
            profileCount: Number,
            score: Number
        },
        managerRelationship: {
            profileCount: Number,
            score: Number
        },
        payTransparency: {
            profileCount: Number,
            score: Number
        }
    },
    reviews: [
        {
            answerBody: String,
            answerCon: String,
            answerPro: String,
            answerTitle: String,
            city: String,
            country: String,
            employer: String,
            jobTitle: String,
            questionId: Number,
            questionPrompt: String,
            questionType: Number,
            updated: Date
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
        ]
    },

    related: [
        {
            employer: {
                type: Schema.Types.ObjectId,
                ref: 'Employer'
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
export const EmployerModel = model<Employer>("Employer", EmployerSchema);