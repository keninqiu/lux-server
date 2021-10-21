import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { JobDao } from "../daos/jobDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';

@Controller('api/job')
export class JobController {
    private dao = new JobDao();

    @Get('')
    @Middleware([authAdmin])
    private async fetchAll(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const items = await this.dao.fetchAll();
       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: items
        }           
       );
    } catch (err:any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }  

    @Get('notparsed')
    private async fetchAllNotParsed(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const items = await this.dao.fetchAllNotParsed();
       for(let i = 0; i < items.length; i++) {
            let item = items[i];
            item = await this.dao.parseRawData(item);
            await this.dao.update(item?._id, item);
       }
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

    @Get('count/notparsed')
    private async fetchCountNotParsed(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const count = await this.dao.fetchCountNotParsed();
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
    private async fetchJobs(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const pageNum = Number(req.params.pageNum);
       const pageSize = Number(req.params.pageSize);
       const items = await this.dao.fetchJobs(pageNum, pageSize);
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


    @Get('all/withoutDuplicate')
    @Middleware([authAdmin])
    private async fetchAllWithoutDuplicate(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const items = await this.dao.fetchAllWithoutDuplicate();
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

    @Get('countryCode/:countryCode/categorySlug/:categorySlug')
    private async fetchAllByCountryCodeAndCategorySlug(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const countryCode = req.params.countryCode;
       const categorySlug = req.params.categorySlug;
       const items = await this.dao.fetchAllByCountryCodeAndCategorySlug(countryCode, categorySlug);
       console.log('items====', items);
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




    @Get('countryCode/:countryCode/slug/:slug')
    private async fetchByCountryCodeAndSlug(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const countryCode = req.params.countryCode;
       let slug:string = req.params.slug;

       slug = encodeURIComponent(slug);

       let item = await this.dao.fetchByCountryCodeAndySlugAndPopulate(countryCode, slug);
       if(item) {
        if(!item.rawData) {
            const url = item.url;
            if(url) {
                const response = await fetch('https://www.payscale.com' + url);
    
                const body = await response.text();
                
                const root = parse(body);
            
                const nextDataNode = root.querySelector('#__NEXT_DATA__');
            
                if(nextDataNode) {
                    const dataText = nextDataNode.text;
                    const rawData = JSON.parse(dataText);
                    await this.dao.update(item._id, {rawData});
                    item.rawData = rawData;
                }
            }
        }
        item = this.dao.parseRawData(item);
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

    @Get('name/:countryName/:name')
    private async fetchByName(req: Request, res: Response): Promise<Response> {
        try {
            const countryName = req.params.countryName;
            const name = req.params.name;
            const items = await this.dao.fetchByName(countryName, name);
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
       let item = await this.dao.fetchByIdAndPopulate(id);

       if(!item) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'not found'
        });          
       }

       item = this.dao.parseRawData(item);

       return res.status(StatusCodes.OK).json(
        {
            success: true,
            data: item
        }           
       );
    } catch (err:any) {
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
          } catch (err:any) {
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
          } catch (err:any) {
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
          } catch (err:any) {
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
          } catch (err:any) {
             return res.status(StatusCodes.BAD_REQUEST).json({
                 success: false,
                 error: err.message
            });
        }
    }      


}