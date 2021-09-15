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
                profileCount: number
            },
            earlyCareer: {
                profileCount: number
            },
            midCareer: {
                profileCount: number
            },
            lateCareer: {
                profileCount: number
            },
            experienced: {
                profileCount: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number
            }
        }
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
                profileCount: number
            },
            earlyCareer: {
                profileCount: number
            },
            midCareer: {
                profileCount: number
            },
            lateCareer: {
                profileCount: number
            },
            experienced: {
                profileCount: number
            }
        },
        gender: {
            male: {
              profileCount: number,
              min: number,
              max: number
            },
            female: {
              profileCount: number,
              min: number,
              max: number
            }
        }
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
                profileCount: Number
            },
            earlyCareer: {
                profileCount: Number
            },
            midCareer: {
                profileCount: Number
            },
            lateCareer: {
                profileCount: Number
            },
            experienced: {
                profileCount: Number
            }
        },
        gender: {
            male: {
              profileCount: Number,
              min: Number,
              max: Number
            },
            female: {
              profileCount: Number,
              min: Number,
              max: Number
            }
        }
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
