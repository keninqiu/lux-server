import { Schema, model, Document } from "mongoose";
import { Category } from "./categorySchema";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ISkill {
    name: string,
    url: string,
    slug?: string,
    salaryType?: string,
    rawData?: any,
    category: string
}
export interface Skill extends Document {
    name: string,
    url: string,
    slug: string,
    salaryType: string,
    category: Category,
    rawData: any
}
const SkillSchema = new Schema<Skill>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    url: String,
    slug: String,
    salaryType: String,
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
export const SkillModel = model<Skill>("Skill", SkillSchema);