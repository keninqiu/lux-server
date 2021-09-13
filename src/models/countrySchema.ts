import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ICountry {
    name: string,
    code: string,
    url: string,
    currencyCode: string
}
export interface Country extends Document {
    name: string,
    code: string,
    url: string,
    currencyCode: string
}
const CountrySchema = new Schema<Country>({
    name: String,
    code: String,
    url: String,
    currencyCode: String,
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