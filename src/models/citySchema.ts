import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICity {
    name: string,
    namet?: string,
    code: string,
    url: string,
    state: string,
    rawData?: any
}
export interface City extends Document {
    name: string,
    namet: string,
    code: string,
    url: string,
    state: string,
    rawData: any
}
const CitySchema = new Schema<City>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
    code: String,
    state: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    url: String,
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
export const CityModel = model<City>("City", CitySchema);