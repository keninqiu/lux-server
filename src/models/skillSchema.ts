import { Schema, model, Document } from "mongoose";

/*

Id	code  CountryName	CurrencyCode
1	AU	  Australia	 AUD
*/

export interface ISkill {
    name: string,
    url: string,
    category: string
}
export interface Skill extends Document {
    name: string,
    url: string,
    category: string
}
const SkillSchema = new Schema<Skill>({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
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
export const SkillModel = model<Skill>("Skill", SkillSchema);