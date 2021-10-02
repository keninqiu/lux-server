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
    ],
    change: {
        title: string,
        subtitle: string,
        content: string
    }
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
    ],
    change: {
        title: string,
        subtitle: string,
        content: string
    },
    salary: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string,
        details: [
            {
                title: string,
                subtitle: string,
                content: string
            }            
        ]        
    },
    experience: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string
    },
    best: {
        title: string,
        subtitle: string,
        actionText: string,
        actionLink: string        
    }
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
    ],
    change: {
        title: String,
        subtitle: String,
        content: String
    },
    salary: {
        title: String,
        subtitle: String,
        actionText: String,
        actionLink: String,
        details: [
            {
                title: String,
                subtitle: String,
                content: String
            }            
        ]        
    },
    experience: {
        title: String,
        subtitle: String,
        actionText: String,
        actionLink: String
    },
    best: {
        title: String,
        subtitle: String,
        actionText: String,
        actionLink: String        
    }
});
export const HomepageModel = model<Homepage>("Homepage", HomepageSchema);