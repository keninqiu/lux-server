import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { AuthDao } from "../daos/authDao";
import * as jwt from "jsonwebtoken";
import { Secret } from '../config/secret';
import { AdminEmails } from '../config/admin-emails';
@Controller('api/auth')
export class AuthController {
    private authDao = new AuthDao();

    @Post('register')
    private async register(req: Request, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const { firstName, lastName, email, employer, password } = req.body;

            const user = await this.authDao.register({ firstName, lastName, email, employer, password });
            if(user) {
                const data = { 
                    userId: user._id, 
                    email: user.email,
                    role: '' 
                };
                const token = jwt.sign(
                    data,
                    Secret.jwtSecret,
                    { expiresIn: "3650d" }
                );
                return res.status(StatusCodes.OK).json(
                    {
                        success: true,
                        data: {
                            token: token
                        }
                    }
                );
            }

          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }  
    
    @Post('login')
    private async login(req: Request, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const { email, password } = req.body;
            const user = await this.authDao.login({ email, password });
            if(!user) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    error: 'user not exist'
               });                
            }
            
            const data = { 
                userId: user._id, 
                email: user.email,
                role: '' 
            };
            if(AdminEmails.indexOf(email) >= 0) {
                data.role = 'admin';
            }
            const token = jwt.sign(
                data,
                Secret.jwtSecret,
                { expiresIn: "3650d" }
            );

            return res.status(StatusCodes.OK).json({
                    success: true,
                    data: {
                        token: token
                    }
               });            
          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }      
}