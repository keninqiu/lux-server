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
    isSupervisor: boolean
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
    isSupervisor: boolean
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
    isSupervisor: Boolean
});

export const SurveyModel = model<Survey>("Survey", SurveySchema);
