import { Schema, model, Document } from "mongoose";

export interface ISurvey {
    type: string,
    user: string,
    job: string,
    years: number,
    city: string,
    compensationType: string,
    avgYears: number,
    minYears: number,
    education: string,
    skills: string[],
    certifications: string[],
    contractStatus: string,
    isSupervisor: boolean,
    employerType: string,
    employerProductActivity: string,
    employerName: string,
    averageSizeCompetitor: number,
    isGovernmentContractor: boolean,
    vacationWeeks: number,
    hasHealthBenefit: boolean,
    remoteWork: string,
    otherBenefits: string[],

    age: number,
    gender: string,
    militaryExperience: boolean,
    roleBefore5Years: string,
    jobSatisfaction: string,
    jobStress: string,
    jobMeaning: string,
    remoteWorkExpectations: string,
    isParent: boolean,

    yearlyPay: number;
    salaryHoursPerWeek: string;
    hourlyPay: number;
    hoursPerWeek: number;
  
    hasBonus: boolean;
    annualBonus: number;
    hasProfitShare: boolean;
    profitShare: number;
    hasSalesCommissions: boolean;
    annualSalesCommissions: number;
    annualSalesVolume: number;
}



export interface Survey extends Document {
    type: string,
    user: string,
    job: string,
    years: number,
    city: string,
    compensationType: string,
    avgYears: number,
    minYears: number,
    education: string,
    skills: string[],
    certifications: string[],
    contractStatus: string,
    isSupervisor: boolean,
    employerType: string,
    employerProductActivity: string,
    employerName: string,
    averageSizeCompetitor: number,
    isGovernmentContractor: boolean,
    vacationWeeks: number,
    hasHealthBenefit: boolean,
    remoteWork: string,
    otherBenefits: string[],
    age: number,
    gender: string,
    militaryExperience: boolean,
    roleBefore5Years: string,
    jobSatisfaction: string,
    jobStress: string,
    jobMeaning: string,
    remoteWorkExpectations: string,
    isParent: boolean,
    yearlyPay: number;
    salaryHoursPerWeek: string;
    hourlyPay: number;
    hoursPerWeek: number;
  
    hasBonus: boolean;
    annualBonus: number;
    hasProfitShare: boolean;
    profitShare: number;
    hasSalesCommissions: boolean;
    annualSalesCommissions: number;
    annualSalesVolume: number;
}

const SurveySchema = new Schema<Survey>({
    type: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'       
    },
    years: Number,
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    compensationType: String,
    avgYears: Number,
    minYears: Number,
    education: String,
    skills: [
        String
    ],
    certifications: [
        String
    ],
    contractStatus: String,
    isSupervisor: Boolean,
    employerType: String,
    employerProductActivity: String,
    employerName: String,
    averageSizeCompetitor: Number,
    isGovernmentContractor: Boolean,
    vacationWeeks: Number,
    hasHealthBenefit: Boolean,
    remoteWork: String,
    otherBenefits: [
        String
    ],
    age: Number,
    gender: String,
    militaryExperience: Boolean,
    roleBefore5Years: String,
    jobSatisfaction: String,
    jobStress: String,
    jobMeaning: String,
    remoteWorkExpectations: String,
    isParent: Boolean,
    yearlyPay: Number,
    salaryHoursPerWeek: String,
    hourlyPay: Number,
    hoursPerWeek: Number,
  
    hasBonus: Boolean,
    annualBonus: Number,
    hasProfitShare: Boolean,
    profitShare: Number,
    hasSalesCommissions: Boolean,
    annualSalesCommissions: Number,
    annualSalesVolume: Number
});

export const SurveyModel = model<Survey>("Survey", SurveySchema);
