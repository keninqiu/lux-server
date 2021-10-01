import { Schema, model, Document } from "mongoose";

export interface ICategory {
    name: string,
    namet?: string,
    slug?: string;
    type: string,
    url: string,
    country: string,
    rawData?: any
}
export interface Category extends Document {
    name: string,
    namet: string,
    slug: string;
    type: string,
    url: string,
    country: string,
    rawData: any
}
const CategorySchema = new Schema<Category>({
    name: String,
    namet: {
        type: Schema.Types.ObjectId,
        ref: 'Translate'
    },
    type: {
        type: String
    },
    slug: String,
    url: String,
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
export const CategoryModel = model<Category>("Category", CategorySchema);