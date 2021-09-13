import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { UserDao } from "../daos/userDao";
import auth from '../middlewares/auth';
import { ICustomRequest } from '../interfaces/custom-request';

@Controller('api/user')
export class UserController {
    private dao = new UserDao();

    @Get('me')
    @Middleware([auth])
    private async fetchMe(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const userId = req.decoded.userId;
       const item = await this.dao.fetchById(userId);
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: item
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }


    @Post('profile')
    @Middleware([auth])
    private async add(req: ICustomRequest, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            
            const body = req.body;

            const userId = req.decoded.userId;

            
            const item = await this.dao.update(userId, body);
            return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: item
                }
                );
          } catch (err) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }

}