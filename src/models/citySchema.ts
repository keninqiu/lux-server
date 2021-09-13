import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICity {
    name: string,
    code: string,
    url: string,
    state: string
}
export interface City extends Document {
    name: string,
    code: string,
    url: string,
    state: string
}
const CitySchema = new Schema<City>({
    name: String,
    code: String,
    state: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    url: String,
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