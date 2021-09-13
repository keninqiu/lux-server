import { Request } from 'express';
export interface ICustomRequest extends Request {
    walletID: string,
    decoded: {
        userId: string,
        email: string,
        iat: number,
        exp: number
    };
}