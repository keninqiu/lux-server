import { Schema, model, Document } from "mongoose";

export interface ITranslate {
    en: string,
    zh: string,
    desc: string,
    desczh: string,
    type: string
}
export interface Translate extends Document {
    en: string,
    zh: string,
    desc: string,
    desczh: string,
    type: string
}
const TranslateSchema = new Schema<Translate>({
    en: String,
    zh: String,
    desc: String,
    desczh: String,
    type: {
        type: String
    }
});
export const TranslateModel = model<Translate>("Translate", TranslateSchema);