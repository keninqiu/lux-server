import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { HomepageDao } from "../daos/homepageDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';

@Controller('api/homepage')
export class HomepageController {
    private dao = new HomepageDao();

    @Get('latest')
    private async fetchLatest(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const item = await this.dao.fetchLatest();

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

    @Put('latest')
    private async updateLatest(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const data = req.body;
       let item = await this.dao.fetchLatest();

       if(item) {
           item = await this.dao.update(item._id, data);
       } else {
           item = await this.dao.create(data);
       }
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
}