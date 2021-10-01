import { Schema, model, Document } from "mongoose";

export interface IHomepage {
    adv: {
        text: string,
        url: string
    }
}
export interface Homepage extends Document {
    adv: {
        text: string,
        url: string
    }
}
const HomepageSchema = new Schema<Homepage>({
    adv: {
        text: String,
        url: String
    }
});
export const HomepageModel = model<Homepage>("Homepage", HomepageSchema);