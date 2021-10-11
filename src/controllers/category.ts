import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { CategoryDao } from "../daos/categoryDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';

@Controller('api/category')
export class CategoryController {
    private dao = new CategoryDao();

    @Get('')
    private async fetchAll(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const items = await this.dao.fetchAll();
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }  
    
    @Get('count')
    private async fetchCount(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const count = await this.dao.fetchCount();
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: count
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }  

    @Get(':pageNum/:pageSize')
    private async fetchCategories(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const pageNum = Number(req.params.pageNum);
       const pageSize = Number(req.params.pageSize);
       const items = await this.dao.fetchCategories(pageNum, pageSize);
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    } 


    @Get('country/:countryId/type/:type')
    private async fetchAllByCountry(req: ICustomRequest, res: Response): Promise<Response> {
    try {
        const coutryId = req.params.countryId;
        const type = req.params.type;
       const items = await this.dao.fetchAllByCountryAndType(coutryId, type);
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }  

    @Get('countryCode/:countryCode/type/:type')
    private async fetchAllByCountryCodeAndType(req: ICustomRequest, res: Response): Promise<Response> {
    try {
        const countryCode = req.params.countryCode;
        const type = req.params.type;
       const items = await this.dao.fetchAllByCountryCodeAndType(countryCode, type);
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    } 

    @Get('countryCode/:countryCode/type/:type/slug/:slug')
    private async fetchByCountryCodeAndTypeSlug(req: ICustomRequest, res: Response): Promise<Response> {
    try {
        const countryCode = req.params.countryCode;
        const type = req.params.type;
        const slug = req.params.slug;
       const item = await this.dao.fetchByCountryCodeAndTypeSlug(countryCode, type, slug);
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

    @Get('type/:type')
    private async fetchAllByType(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const type = req.params.type; 
       const items = await this.dao.fetchAllByTypePopulate(type);
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    } 

    @Get(':id')
    private async fetchById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
       const item = await this.dao.fetchById(id);
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

    @Put(':id')
    @Middleware([authAdmin])
    private async update(req: Request, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const data = req.body;
            const id = req.params.id;
            const item = await this.dao.update(id, data);
            return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: item
                }
                );
          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }

    @Post()
    @Middleware([authAdmin])
    private async add(req: ICustomRequest, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const body = req.body;
            
            const item = await this.dao.create(body);

            return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: item
                }
            );
          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }


    @Delete(':id')
    @Middleware([authAdmin])
    private async delete(req: Request, res: Response) {
        
        try {
            const id = req.params.id;
            const item = await this.dao.delete(id);
            return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: item
                }
                );
          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }    

    @Post('deleteMany')
    @Middleware([authAdmin])
    private async deleteMany(req: Request, res: Response) {
        try {
            const ids = req.body;
            const items = await this.dao.deleteMany(ids);
            return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: items
                }
                );
          } catch (err: any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }      


}