import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { CountryDao } from "../daos/countryDao";
import { JobDao } from "../daos/jobDao";
import { EmployerDao } from "../daos/employerDao";
import { DegreeDao } from "../daos/degreeDao";
import { SchoolDao } from "../daos/schoolDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';

@Controller('api/country')
export class CountryController {
    private dao = new CountryDao();
    private jobDao = new JobDao();
    private employerDao = new EmployerDao();
    private degreeDao = new DegreeDao();
    private schoolDao = new SchoolDao();
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

    private async parseRawData(itemData: any) {
        if(!itemData) {
            return itemData;
        }
        if(itemData.rawData &&  !itemData.rawDataParsed) {
            itemData.rawDataParsed = true;
            const pageProps = itemData.rawData.props.pageProps;
            //const collegeData = pageProps.collegeData;
            const pageData = pageProps.pageData;
            //const about = collegeData.about;
            itemData.currencyCode = pageData.currencyCode;
            const byDimension = pageData.byDimension;
 
            itemData.byDimension = {                
                salaryByJob: [],
                hourlyRateByJob: [],
                salaryByDegree: [],
                hourlyRateByDegree: [],
                salaryByEmployer: [],
                hourlyRateByEmployer: [],
                salaryBySchool: [],
                hourlyRateBySchool: [],
            };

            if(byDimension) {

                const promiseAll = [];
                if(byDimension['Average Salary by Job']) {
                    const items = byDimension['Average Salary by Job']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                job: null
                            }
                            if(item.url) {
                                const partialUrl = item.url.replace('/Salary', '');
                                promiseAll.push(this.jobDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.salaryByJob.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average Hourly Rate by Job']) {
                    const items = byDimension['Average Hourly Rate by Job']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                job: null
                            }
                            if(item.url) {
                                promiseAll.push(this.jobDao.fetchByUrl(item.url));
                            }
                            itemData.byDimension.hourlyRateByJob.push(byDimensionItem);
                        }
                    }   
                }


                if(byDimension['Average Salary by Degree Major']) {
                    const items = byDimension['Average Salary by Degree Major']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                degree: null
                            }

                            if(item.url) {
                                const partialUrl = item.url.replace('/Salary', '');
                                promiseAll.push(this.degreeDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.salaryByDegree.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average Hourly Rate by Degree Major']) {
                    const items = byDimension['Average Hourly Rate by Degree Major']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                degree: null
                            }

                            if(item.url) {
                                promiseAll.push(this.degreeDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.hourlyRateByDegree.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average Salary by Employer']) {
                    const items = byDimension['Average Salary by Employer']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                employer: null
                            }

                            if(item.url) {
                                const partialUrl = item.url.replace('/Salary', '');
                                promiseAll.push(this.employerDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.salaryByEmployer.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average Hourly Rate by Employer']) {
                    const items = byDimension['Average Hourly Rate by Employer']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                employer: null
                            }
                            if(!item.url) {
                                console.log('item.url is null for:', item);
                            }

                            if(item.url) {
                                promiseAll.push(this.employerDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.hourlyRateByEmployer.push(byDimensionItem);
                        }
                    }   
                }


                if(byDimension['Average Salary by School']) {
                    const items = byDimension['Average Salary by School']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                school: null
                            }

                            if(item.url) {
                                promiseAll.push(this.schoolDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.salaryBySchool.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average Hourly Rate by School']) {
                    const items = byDimension['Average Hourly Rate by School']['rows'];
                    if(items && items.length > 0) {
                        for(let i = 0; i < items.length;i++) {
                            const item = items[i];
                            const byDimensionItem = {
                                name: item.name,
                                url: item.url,
                                avg: item.range['50'],
                                min: item.range['10'] ? item.range['10'] : (item.range['25'] ? item.range['25'] : 0),
                                max: item.range['90'] ? item.range['90'] : (item.range['75'] ? item.range['75'] : 0),
                                school: null
                            }

                            if(item.url) {
                                promiseAll.push(this.schoolDao.fetchByUrl(item.url));
                            }

                            itemData.byDimension.hourlyRateBySchool.push(byDimensionItem);
                        }
                    }   
                }                
                
                const entities = await Promise.all(promiseAll);
                
                let entityIndex = 0;
                for(let i = 0; i < itemData.byDimension.salaryByJob.length; i++) {
                    const item = itemData.byDimension.salaryByJob[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.job = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.hourlyRateByJob.length; i++) {
                    const item = itemData.byDimension.hourlyRateByJob[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.job = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.salaryByDegree.length; i++) {
                    const item = itemData.byDimension.salaryByDegree[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.degree = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.hourlyRateByDegree.length; i++) {
                    const item = itemData.byDimension.hourlyRateByDegree[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.degree = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.salaryByEmployer.length; i++) {
                    const item = itemData.byDimension.salaryByEmployer[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.employer = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.hourlyRateByEmployer.length; i++) {
                    const item = itemData.byDimension.hourlyRateByEmployer[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.employer = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.salaryBySchool.length; i++) {
                    const item = itemData.byDimension.salaryBySchool[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.school = entity._id;
                            }
                        }
                    }
                }

                for(let i = 0; i < itemData.byDimension.hourlyRateBySchool.length; i++) {
                    const item = itemData.byDimension.hourlyRateBySchool[i];
                    if(item.url) {
                        if(entityIndex < entities.length) {
                            const entity = entities[entityIndex++];
                            if(entity) {
                                item.school = entity._id;
                            }
                        }

                    }
                }

            }

        }

        return itemData;
    }

    @Get('code/:code')
    private async fetchByCode(req: Request, res: Response): Promise<Response> {
    try {
       const code = req.params.code;
       let item = await this.dao.fetchByCode(code);
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
            if(item.rawData &&  !item.rawDataParsed) {
                item = await this.parseRawData(item);
                await this.dao.update(item?._id, item);
                item = await this.dao.fetchByCode(code);
            }
       }
       if(item) {
        item.rawData = null;
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