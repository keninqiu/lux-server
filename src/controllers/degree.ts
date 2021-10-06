import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { DegreeDao } from "../daos/degreeDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';
import { JobDao } from '../daos/jobDao';

@Controller('api/degree')
export class DegreeController {
    private dao = new DegreeDao();
    private jobDao = new JobDao();
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
    } catch (err: any) {
       return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: err.message,
    });
    }
    }  
  
    @Get('all/withoutDuplicate')
    @Middleware([authAdmin])
    private async fetchAllWithoutDuplicated(req: ICustomRequest, res: Response): Promise<Response> {
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

    @Get('countryCode/:countryCode')
    private async fetchAllByCountryCode(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const countryCode = req.params.countryCode;
       const items = await this.dao.fetchAllByCountryCode(countryCode);
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

    private async parseRawData(itemData: any) {
        if(!itemData) {
            return itemData;
        }
        if(itemData.rawData &&  !itemData.rawDataParsed) {
            const pageProps = itemData.rawData.props.pageProps;
            //const collegeData = pageProps.collegeData;
            const pageData = pageProps.pageData;
            //const about = collegeData.about;
            itemData.currencyCode = pageData.currencyCode;
            const compensation = pageData.compensation;
            const byDimension = pageData.byDimension;
            itemData.reviews = pageProps.reviews;
            itemData.compensation = {
                salary: {
                    profileCount: compensation.salary ? compensation.salary.profileCount : 0,
                    min: compensation.salary ? (compensation.salary['10'] ? compensation.salary['10'] : compensation.salary['25']) : 0,
                    max: compensation.salary ? (compensation.salary['90'] ? compensation.salary['90'] : compensation.salary['75']) : 0,
                    avg: compensation.salary ? compensation.salary['50'] : 0
                },
                hourlyRate: {
                    profileCount: compensation.hourlyRate ? compensation.hourlyRate.profileCount : 0,
                    min: compensation.hourlyRate ? (compensation.hourlyRate['10'] ? compensation.hourlyRate['10'] : compensation.hourlyRate['25']) : 0,
                    max: compensation.hourlyRate ? (compensation.hourlyRate['90'] ? compensation.hourlyRate['90'] : compensation.hourlyRate['75']) : 0,
                    avg: compensation.hourlyRate ? compensation.hourlyRate['50'] : 0                    
                },
                bonus: {
                    profileCount: compensation.bonus ? compensation.bonus.profileCount : 0,
                    min: compensation.bonus ? (compensation.bonus['10'] ? compensation.bonus['10'] : compensation.bonus['25']) : 0,
                    max: compensation.bonus ? (compensation.bonus['90'] ? compensation.bonus['90'] : compensation.bonus['75']) : 0,
                    avg: compensation.bonus ? compensation.bonus['50'] : 0                    
                },
                commission: {
                    profileCount: compensation.commission ? compensation.commission.profileCount : 0,
                    min: compensation.commission ? (compensation.commission['10'] ? compensation.commission['10'] : compensation.commission['25']) : 0,
                    max: compensation.commission ? (compensation.commission['90'] ? compensation.commission['90'] : compensation.commission['75']) : 0,
                    avg: compensation.commission ? compensation.commission['50'] : 0                    
                },
                profitSharing: {
                    profileCount: compensation.profitSharing ? compensation.profitSharing.profileCount : 0,
                    min: compensation.profitSharing ? (compensation.profitSharing['10'] ? compensation.profitSharing['10'] : compensation.profitSharing['25']) : 0,
                    max: compensation.profitSharing ? (compensation.profitSharing['90'] ? compensation.profitSharing['90'] : compensation.profitSharing['75']) : 0,
                    avg: compensation.profitSharing ? compensation.profitSharing['50'] : 0                    
                },
                total: {
                    profileCount: compensation.total ? compensation.total.profileCount : 0,
                    min: compensation.total ? (compensation.total['10'] ? compensation.total['10'] : compensation.total['25']) : 0,
                    max: compensation.total ? (compensation.total['90'] ? compensation.total['90'] : compensation.total['75']) : 0,
                    avg: compensation.total ? compensation.total['50'] : 0                    
                }
            };
            /*
            item.ratings = {
                overall: pageData.ratings['Overall Employee Satisfaction'],
                appreciation: pageData.ratings['Appreciation'],
                companyOutlook: pageData.ratings['Company Outlook'],
                fairPay: pageData.ratings['Fair Pay'],
                learningandDevelopment: pageData.ratings['Learning and Development'],
                managerCommunication: pageData.ratings['Manager Communication'],
                managerRelationship: pageData.ratings['Manager Relationship'],
                payTransparency: pageData.ratings['Pay Transparency']
            };
            */

            itemData.byDimension = {
                experience: {
                    entryLevel: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    },
                    earlyCareer: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    },
                    midCareer: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    },
                    lateCareer: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    },
                    experienced: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    }
                },
                gender: {
                    male: {
                      profileCount: 0,
                      min: 0,
                      max: 0,
                      avg: 0
                    },
                    female: {
                      profileCount: 0,
                      min: 0,
                      max: 0,
                      avg: 0
                    }
                },                
                salaryByJob: [],
                hourlyRateByJob: []
            };

            const promiseAll: any = [];
            if(byDimension) {
                if(byDimension['Average Salary By Gender']) {
                    const byGenderItems = byDimension['Average Salary By Gender']['rows'];
                    if(byGenderItems && byGenderItems.length > 0) {
                        for(let i = 0; i < byGenderItems.length;i++) {
                            const byGenderItem = byGenderItems[i];
                            if(byGenderItem.name == 'Male') {
                                itemData.byDimension.gender.male.profileCount = byGenderItem.profileCount;
                                if(byGenderItem.range) {
                                    itemData.byDimension.gender.male.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                    itemData.byDimension.gender.male.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                    itemData.byDimension.gender.male.avg = byGenderItem.range['50'];
                                }
                            } else 
                            if(byGenderItem.name == 'Female') {
                                itemData.byDimension.gender.female.profileCount = byGenderItem.profileCount;
                                if(byGenderItem.range) {
                                    itemData.byDimension.gender.female.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                    itemData.byDimension.gender.female.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                    itemData.byDimension.gender.female.avg = byGenderItem.range['50'];
                                }
                            }
        
        
                            
                        }
                    }
                }
    
                if(byDimension['Average Salary by Years_Experience Range']) {
                    const byExperienceItems = byDimension['Average Salary by Years_Experience Range']['rows'];
                    if(byExperienceItems && byExperienceItems.length > 0) {
                        for(let i = 0; i < byExperienceItems.length;i++) {
                            const byExperienceItem = byExperienceItems[i];
                            if(byExperienceItem.name == '10-19 years') {
                                itemData.byDimension.experience.lateCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    itemData.byDimension.experience.lateCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    itemData.byDimension.experience.lateCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    itemData.byDimension.experience.lateCareer.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '20 years or more') {
                                itemData.byDimension.experience.experienced.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    itemData.byDimension.experience.experienced.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    itemData.byDimension.experience.experienced.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    itemData.byDimension.experience.experienced.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '1-4 years') {
                                itemData.byDimension.experience.earlyCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    itemData.byDimension.experience.earlyCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    itemData.byDimension.experience.earlyCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    itemData.byDimension.experience.earlyCareer.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '5-9 years') {
                                itemData.byDimension.experience.midCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    itemData.byDimension.experience.midCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    itemData.byDimension.experience.midCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    itemData.byDimension.experience.midCareer.avg = byExperienceItem.range['50'];
                                }
                            } else {
                                itemData.byDimension.experience.entryLevel.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    itemData.byDimension.experience.entryLevel.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    itemData.byDimension.experience.entryLevel.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    itemData.byDimension.experience.entryLevel.avg = byExperienceItem.range['50'];   
                                }                         
                            }
                        } 
                    }
                }
    
    
    
    
                if(byDimension['Average Salary by Job']) {
                    const salaryByJobItems = byDimension['Average Salary by Job']['rows'];
                    if(salaryByJobItems && salaryByJobItems.length > 0) {
                        for(let i = 0; i < salaryByJobItems.length;i++) {
                            const salaryByJobItem = salaryByJobItems[i];
                            const byDimensionItem = {
                                name: salaryByJobItem.name,
                                url: salaryByJobItem.url,
                                avg: salaryByJobItem.range['50'],
                                min: salaryByJobItem.range['10'] ? salaryByJobItem.range['10'] : (salaryByJobItem.range['25'] ? salaryByJobItem.range['25'] : 0),
                                max: salaryByJobItem.range['90'] ? salaryByJobItem.range['90'] : (salaryByJobItem.range['75'] ? salaryByJobItem.range['75'] : 0)
                            }
                            if(salaryByJobItem.url) {
                                promiseAll.push(this.jobDao.fetchByUrl(salaryByJobItem.url));
                            }
                            itemData.byDimension.salaryByJob.push(byDimensionItem);
                        }
                    }   
                }

                if(byDimension['Average HourlyRate by Job']) {
                    const hourlyRateByJobItems = byDimension['Average Hourly Rate by Job']['rows'];
                    if(hourlyRateByJobItems && hourlyRateByJobItems.length > 0) {
                        for(let i = 0; i < hourlyRateByJobItems.length;i++) {
                            const hourlyRateByJobItem = hourlyRateByJobItems[i];
                            const byDimensionItem = {
                                name: hourlyRateByJobItem.name,
                                url: hourlyRateByJobItem.url,
                                avg: hourlyRateByJobItem.range['50'],
                                min: hourlyRateByJobItem.range['10'] ? hourlyRateByJobItem.range['10'] : (hourlyRateByJobItem.range['25'] ? hourlyRateByJobItem.range['25'] : 0),
                                max: hourlyRateByJobItem.range['90'] ? hourlyRateByJobItem.range['90'] : (hourlyRateByJobItem.range['75'] ? hourlyRateByJobItem.range['75'] : 0)
                            }
                            if(hourlyRateByJobItem.url) {
                                promiseAll.push(this.jobDao.fetchByUrl(hourlyRateByJobItem.url));
                            }
                            itemData.byDimension.hourlyRateByJob.push(byDimensionItem);
                        }
                    }   
                }
            }

  
            
            const related = pageData.related;       
            if(related && related.length > 0) {
               for(let i = 0; i < related.length;i++) {
                   const relatedItem = related[i];
                   const relatedItemChanged = {
                       name: relatedItem.name,
                       url: relatedItem.url,
                       avg: relatedItem.range['50'],
                       min: relatedItem.range['10'] ? relatedItem.range['10'] : (relatedItem.range['25'] ? relatedItem.range['25'] : 0),
                       max: relatedItem.range['90'] ? relatedItem.range['90'] : (relatedItem.range['75'] ? relatedItem.range['75'] : 0)
                   }
                   if(relatedItem.url) {
                        promiseAll.push(this.dao.fetchByUrl(relatedItem.url));
                    }
                    itemData.related.push(relatedItemChanged);
               }
            }  

            const entities = await Promise.all(promiseAll);
                
            let entityIndex = 0;
            for(let i = 0; i < itemData.byDimension.salaryByJob.length; i++) {
                const item = itemData.byDimension.salaryByJob[i];
                if(item.url) {
                    if(entityIndex < entities.length) {
                        const entity: any = entities[entityIndex++];
                        if(entity && entity._id) {
                            item.job = entity._id;
                        } else {
                            itemData.byDimension.salaryByJob.splice(i, 1); 
                            i --;
                        }


                    }
                }
            }



            for(let i = 0; i < itemData.byDimension.hourlyRateByJob.length; i++) {
                const item = itemData.byDimension.hourlyRateByJob[i];
                if(item.url) {
                    if(entityIndex < entities.length) {
                        const entity: any = entities[entityIndex++];
                        if(entity && entity._id) {
                            item.job = entity._id;
                        } else {
                            itemData.byDimension.hourlyRateByJob.splice(i, 1); 
                            i --;
                        }
                    }
                }
            }  


            for(let i = 0; i < itemData.related.length; i++) {
                const item = itemData.related[i];
                if(item.url) {
                    if(entityIndex < entities.length) {
                        const entity: any = entities[entityIndex++];
                        if(entity && entity._id) {
                            item.degree = entity._id;
                        } else {
                            itemData.related.splice(i, 1); 
                            i --;
                        }
                    }
                }
            }  


            if(pageData.ratings && pageData.ratings['Job Satisfaction Overall']) {
                itemData.ratings = {
                    jobSatisfaction: pageData.ratings['Job Satisfaction Overall']
                };
            }
        }

        return itemData;
    }


    @Get('countryCode/:countryCode/slug/:slug')
    private async fetchByCountryCodeAndSlug(req: ICustomRequest, res: Response): Promise<Response> {
    try {
        console.log('fetch all');
       const countryCode = req.params.countryCode;
       let slug:string = req.params.slug;

       slug = encodeURIComponent(slug);
       console.log('slugggg=', slug);
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
            if(item.rawData &&  !item.rawDataParsed) {
                item = await this.parseRawData(item);
                await this.dao.update(item?._id, item);
                item = await this.dao.fetchByCountryCodeAndySlugAndPopulate(countryCode, slug);
            }
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

    @Get(':id')
    private async fetchById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
       let item = await this.dao.fetchByIdAndPopulate(id);
       item = await this.parseRawData(item);
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