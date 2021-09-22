import { Schema, model, Document } from "mongoose";

export interface IPopular {
    type: string,
    url: string,
    country: string,
    rawData?: any
}
export interface Popular extends Document {
    type: string,
    url: string,
    country: string,
    rawData: any
}
const PopularSchema = new Schema<Popular>({
    type: {
        type: String
    },
    url: String,
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
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
export const PopularModel = model<Popular>("Popular", PopularSchema);