import { Schema, model, Document } from "mongoose";

export interface ISurvey {
    type: string,
    user: string,
    job: string,
    years: number,
    city: string,
    compensationType: string
}

export interface Survey extends Document {
    type: string,
    user: string,
    job: string,
    years: number,
    city: string,
    compensationType: string
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
    compensationType: String
});

export const SurveyModel = model<Survey>("Survey", SurveySchema);
