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
    @Middleware([authAdmin])
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

    @Put('carousel/:id')
    @Middleware([authAdmin])
    private async updateCarousel(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const id = req.params.id;
            let item = await this.dao.fetchLatest();
     
            if(item) {
                item = await this.dao.updateByQuery({'carousels._id': id}, {'carousels.$': body});
                return res.status(StatusCodes.OK).json(
                 {
                     success: true,
                     data: item
                 }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
             {
                 success: false,
                 data: 'homepage not existed'
             }           
            );       
         } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
         }
    }  

    @Delete('carousel/:id')
    @Middleware([authAdmin])
    private async deleteCarousel(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            let item = await this.dao.fetchLatest();
     
            console.log('id to be deleted=', id);
            if(item) {
                item = await this.dao.update(item._id, { $pull: {carousels: {_id: id} }  });
                return res.status(StatusCodes.OK).json(
                 {
                     success: true,
                     data: item
                 }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
             {
                 success: false,
                 data: 'homepage not existed'
             }           
            );       
         } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
         }
    } 

    @Put('salary/detail/:id')
    @Middleware([authAdmin])
    private async updateSalaryDetail(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const body = req.body;
            const id = req.params.id;
            let item = await this.dao.fetchLatest();
     
            if(item) {
                item = await this.dao.updateByQuery({'salary.details._id': id}, {'salary.details.$': body});
                return res.status(StatusCodes.OK).json(
                 {
                     success: true,
                     data: item
                 }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
             {
                 success: false,
                 data: 'homepage not existed'
             }           
            );       
         } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
         }
    }  


    @Post('salary/detail')
    @Middleware([authAdmin])
    private async addSalaryDetail(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const data ={ $push: { 'salary.details': body } };
            let item = await this.dao.fetchLatest();

            if(item) {
                item = await this.dao.update(item._id, data);
                return res.status(StatusCodes.OK).json(
                    {
                        success: true,
                        data: item
                    }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
                {
                    success: false,
                    data: 'homepage not existed'
                }           
            );       
        } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
        }
    } 

    @Delete('salary/detail/:id')
    @Middleware([authAdmin])
    private async deleteSalaryDetail(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            let item = await this.dao.fetchLatest();
     
            if(item) {
                item = await this.dao.update(item._id, { $pull: {'salary.details': {_id: id} }  });
                return res.status(StatusCodes.OK).json(
                 {
                     success: true,
                     data: item
                 }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
             {
                 success: false,
                 data: 'homepage not existed'
             }           
            );       
         } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
         }
    } 

    @Post('carousel')
    @Middleware([authAdmin])
    private async addCarousel(req: ICustomRequest, res: Response): Promise<Response> {
        try {
            const body = req.body;

            const data ={ $push: { carousels: body } };
            let item = await this.dao.fetchLatest();

            if(item) {
                item = await this.dao.update(item._id, data);
                return res.status(StatusCodes.OK).json(
                    {
                        success: true,
                        data: item
                    }           
                );
            }
            return res.status(StatusCodes.BAD_REQUEST).json(
                {
                    success: false,
                    data: 'homepage not existed'
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