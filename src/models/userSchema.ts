import { Schema, model, Document } from "mongoose";

export interface IUser {
   firstName?: string;
   lastName?: string;    
   phone?: string;
   email: string;
   password: string; 
   avatar?: string;
   employer: {
      employees: number
   }
}

export interface IRegisterModel {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string; 
    employer: {
      employees: number
    }
}

export interface ILoginModel {
    email: string;
    password: string; 
}

export interface User extends Document {
    firstName?: string;
    lastName?: string;    
    phone?: string;
    email: string;
    password: string; 
    avatar?: string;
    employer: {
      employees: number
    }
}

const UserSchema = new Schema<User>({
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true
   },
   employer: {
      employees: Number
   }
});

UserSchema.index({ email: 1, store: 1}, { unique: true });
export const UserModel = model<User>("User", UserSchema);