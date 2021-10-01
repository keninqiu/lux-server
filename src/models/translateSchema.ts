import { Schema, model, Document } from "mongoose";

export interface ITranslate {
    en: string,
    zh: string,
    type: string
}
export interface Translate extends Document {
    en: string,
    zh: string,
    type: string
}
const TranslateSchema = new Schema<Translate>({
    en: String,
    zh: String,
    type: {
        type: String
    }
});
export const TranslateModel = model<Translate>("Translate", TranslateSchema);