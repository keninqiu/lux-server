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
    jobs?: string[],
    employers?: string[],
    degrees?: string[],
    schools?: string[],
    rawData?: any
}
export interface Country extends Document {
    name: string,
    namet: string,
    code: string,
    url: string,
    currencyCode: string,
    jobs: string[],
    employers: string[],
    degrees: string[],
    schools: string[],
    rawData: any
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
    jobs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    employers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employer'
        }
    ],
    degrees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Degree'
        }
    ],
    schools: [
        {
            type: Schema.Types.ObjectId,
            ref: 'School'
        }
    ],
    rawData: Object,
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