import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

export interface ISchool {
    name: string,
    namet?: string,
    category: string,
    url: string,
    city: string,
    rawDataParsed: boolean,
    currencyCode: string,
    rawData?: any,
    slug?: string,
    salaryType?: string,
    compensation: {
        hourlyRate: {
            min: number,
            max: number,
            avg: number
        },
        salary: {
            min: number,
            max: number,
            avg: number
        },
    },
    about: {
        abstract: string,
        streetAddress: string,
        city: string,
        state: string,
        zip: string,
        website: string,
        admissionsUrl: string,
        wikiUrl: string,
        percentStem: number,
        graduationRate: number,
        percentStayInState: number,
        percentReceivingPellGrants: number,
        studentsEnrolled: number,
        satScores: {
            lowerPercentile: number,
            upperPercentile: number
        }
        actScores:{
           lowerPercentile: number,
           upperPercentile: number
        },
    },  
    roi: {
        totalCostOnCampus: number,
        totalCostOffCampus: number,
        net20YearRoiOnCampus: number,
        net20YearRoiOffCampus: number,
        net20YearRoiWithAidOnCampus: number,
        net20YearRoiWithAidOffCampus: number,
        annualizedRoiOnCampus: number,
        annualizedRoiOffCampus: number,
        annualizedRoiWithAidOnCampus: number,
        annualizedRoiWithAidOffCampus: number,
        graduationRate: number,
        typicalYearsToGraduate: number,
        percentReceivingGrantMoney: number,
        averageLoanAmount4Years: number,
        overallRank: number        
    },   
    salary: {
        earlyCareerMedianPay: number,
        midCareerMedianPay: number,
        percentHighMeaning: number,
        percentMale: number,
        percentFemale: number,
        percentStem: number,
        percentPell: number,
        percentRecommending: number,
        undergraduateEnrollment: number,
        rank: number,     
    },
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            earlyCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            midCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            lateCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            experienced: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            }
        },
        salaryByJob: [
            {
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
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ]
    },
    related: [
        {
            name: string,
            url: string,
            min: number,
            max: number,
            avg: number                
        }
    ] 
}
export interface School extends Document {
    name: string,
    namet: string,
    category: Category,
    url: string,
    city: string,
    slug: string,
    salaryType: string,
    currencyCode: string,
    rawDataParsed: boolean,
    rawData: any,
    compensation: {
        hourlyRate: {
            min: number,
            max: number,
            avg: number
        },
        salary: {
            min: number,
            max: number,
            avg: number
        },
    },
    about: {
        abstract: string,
        streetAddress: string,
        city: string,
        state: string,
        zip: string,
        website: string,
        admissionsUrl: string,
        wikiUrl: string,
        percentStem: number,
        graduationRate: number,
        percentStayInState: number,
        percentReceivingPellGrants: number,
        studentsEnrolled: number,
        satScores: {
            lowerPercentile: number,
            upperPercentile: number
        }
        actScores:{
           lowerPercentile: number,
           upperPercentile: number
        },
    },  
    roi: {
        totalCostOnCampus: number,
        totalCostOffCampus: number,
        net20YearRoiOnCampus: number,
        net20YearRoiOffCampus: number,
        net20YearRoiWithAidOnCampus: number,
        net20YearRoiWithAidOffCampus: number,
        annualizedRoiOnCampus: number,
        annualizedRoiOffCampus: number,
        annualizedRoiWithAidOnCampus: number,
        annualizedRoiWithAidOffCampus: number,
        graduationRate: number,
        typicalYearsToGraduate: number,
        percentReceivingGrantMoney: number,
        averageLoanAmount4Years: number,
        overallRank: number        
    },   
    salary: {
        earlyCareerMedianPay: number,
        midCareerMedianPay: number,
        percentHighMeaning: number,
        percentMale: number,
        percentFemale: number,
        percentStem: number,
        percentPell: number,
        percentRecommending: number,
        undergraduateEnrollment: number,
        rank: number
    },
    byDimension: {
        experience: {
            entryLevel: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            earlyCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            midCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            lateCareer: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            },
            experienced: {
                profileCount: number,
                min: number,
                max: number,
                avg: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number,
              avg: number
            }
        },
        salaryByJob: [
            {
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
                name: string,
                url: string,
                profileCount: number,
                min: number,
                max: number,
                avg: number                
            }
        ]
    },
    related: [
        {
            name: string,
            url: string,
            min: number,
            max: number,
            avg: number                
        }
    ]          
}
const SchoolSchema = new Schema<School>({
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
        ref: 'School'
    },
    url: String,
    slug: String,
    salaryType: String,
    currencyCode: String,
    rawDataParsed: Boolean,
    rawData: Object,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    compensation: {
        hourlyRate: {
            min: Number,
            max: Number,
            avg: Number
        },
        salary: {
            min: Number,
            max: Number,
            avg: Number
        },
    },  
    about: {
        abstract: String,
        streetAddress: String,
        city: String,
        state: String,
        zip: String,
        website: String,
        admissionsUrl: String,
        wikiUrl: String,
        graduationRate: Number,
        percentStem: Number,
        percentStayInState: Number,
        percentReceivingPellGrants: Number,
        studentsEnrolled: Number,
        satScores: {
            lowerPercentile: Number,
            upperPercentile: Number
        },
        actScores:{
           lowerPercentile: Number,
           upperPercentile: Number
        },
    },  
    roi: {
        totalCostOnCampus: Number,
        totalCostOffCampus: Number,
        net20YearRoiOnCampus: Number,
        net20YearRoiOffCampus: Number,
        net20YearRoiWithAidOnCampus: Number,
        net20YearRoiWithAidOffCampus: Number,
        annualizedRoiOnCampus: Number,
        annualizedRoiOffCampus: Number,
        annualizedRoiWithAidOnCampus: Number,
        annualizedRoiWithAidOffCampus: Number,
        graduationRate: Number,
        typicalYearsToGraduate: Number,
        percentReceivingGrantMoney: Number,
        averageLoanAmount4Years: Number,
        overallRank: Number        
    },
    salary: {
        earlyCareerMedianPay: Number,
        midCareerMedianPay: Number,
        percentHighMeaning: Number,
        percentMale: Number,
        percentFemale: Number,
        percentStem: Number,
        percentPell: Number,
        percentRecommending: Number,
        undergraduateEnrollment: Number,
        rank: Number      
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
        ],
        hourlyRateByJob: [
            {
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
