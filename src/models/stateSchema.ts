import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface IState {
    name: string,
    code: string,
    url: string,
    type: string,
    rawData?: any,
    location: string,
    country: string
}
export interface State extends Document {
    name: string,
    code: string,
    url: string,
    type: string,
    location: string,
    country: string,
    rawData: any
}
const StateSchema = new Schema<State>({
    name: String,
    code: String,
    type: String,
    url: String,
    location: String,
    rawData: Object,
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
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
export const StateModel = model<State>("State", StateSchema);