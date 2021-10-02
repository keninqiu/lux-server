import { Schema, model, Document } from "mongoose";

export interface IHomepage {
    adv: {
        text: string,
        url: string
    },
    carousels: [
        {
            title: string,
            subtitle: string,
            actionText: string,
            actionLink: string
        }
    ]
}
export interface Homepage extends Document {
    adv: {
        text: string,
        url: string
    },
    carousels: [
        {
            title: string,
            subtitle: string,
            actionText: string,
            actionLink: string
        }
    ]
}
const HomepageSchema = new Schema<Homepage>({
    adv: {
        text: String,
        url: String
    },
    carousels: [
        {
            title: String,
            subtitle: String,
            actionText: String,
            actionLink: String
        }
    ]
});
export const HomepageModel = model<Homepage>("Homepage", HomepageSchema);