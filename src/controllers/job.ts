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
            item = await this.parseRawData(item);
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


    private parseRawData(item: any) {
        if(!item) {
            return item;
        }
        if(item.rawData &&  !item.rawDataParsed) {
            item.rawDataParsed = true;
            const pageProps = item.rawData.props.pageProps;
            //const collegeData = pageProps.collegeData;
            const pageData = pageProps.pageData;
            //const about = collegeData.about;
            item.currencyCode = pageData.currencyCode;
    
            item.careerPathData = pageProps.careerPathData;
            item.narratives = pageData.narratives;
            const compensation = pageData.compensation;
            item.compensation = {
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
            }
    
    
    
            item.byDimension = {
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
                    },
                    selfDefine: {
                        profileCount: 0,
                        min: 0,
                        max: 0,
                        avg: 0
                    } 
                },
                healthBenefit: {
                    medical: {
                        profileCount: 0
                    },
                    dental: {
                        profileCount: 0
                    },
                    vision: {
                        profileCount: 0
                    },
                    none: {
                        profileCount: 0
                    }
                }
            };                
            const byDimension = pageData.byDimension;
            //console.log('byDimension==', byDimension);

            if(byDimension) {
                if(byDimension['Gender Breakdown']) {
                    const byGenderItems = byDimension['Gender Breakdown']['rows'];
                    if(byGenderItems && byGenderItems.length > 0) {
                        for(let i = 0; i < byGenderItems.length;i++) {
                            const byGenderItem = byGenderItems[i];
                            if(byGenderItem.name == 'Male') {
                                item.byDimension.gender.male.profileCount = byGenderItem.profileCount;
                                if(byGenderItem.range) {
                                    item.byDimension.gender.male.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                    item.byDimension.gender.male.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                    item.byDimension.gender.male.avg = byGenderItem.range['50'];
                                }
            
                            } else 
                            if(byGenderItem.name == 'Female') {
                                item.byDimension.gender.female.profileCount = byGenderItem.profileCount;
                                if(byGenderItem.range) {
                                    item.byDimension.gender.female.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                    item.byDimension.gender.female.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                    item.byDimension.gender.female.avg = byGenderItem.range['50'];
                                }
            
                            } else
                            if(byGenderItem.name == 'Prefer to self-define') {
                                item.byDimension.gender.selfDefine.profileCount = byGenderItem.profileCount;
                                if(byGenderItem.range) {
                                    item.byDimension.gender.selfDefine.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                    item.byDimension.gender.selfDefine.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                    item.byDimension.gender.selfDefine.avg = byGenderItem.range['50'];
                                }
                            }
                        }
                    }
                }
    
                if(byDimension['Job by Experience']) {
                    const byExperienceItems = byDimension['Job by Experience']['rows'];
                    if(byExperienceItems && byExperienceItems.length > 0) {
                        for(let i = 0; i < byExperienceItems.length;i++) {
                            const byExperienceItem = byExperienceItems[i];
                            if(byExperienceItem.name == '10-19 years') {
                                item.byDimension.experience.lateCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    item.byDimension.experience.lateCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    item.byDimension.experience.lateCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    item.byDimension.experience.lateCareer.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '20 years or more') {
                                item.byDimension.experience.experienced.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    item.byDimension.experience.experienced.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    item.byDimension.experience.experienced.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    item.byDimension.experience.experienced.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '1-4 years') {
                                item.byDimension.experience.earlyCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    item.byDimension.experience.earlyCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    item.byDimension.experience.earlyCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    item.byDimension.experience.earlyCareer.avg = byExperienceItem.range['50'];
                                }
                            } else 
                            if(byExperienceItem.name == '5-9 years') {
                                item.byDimension.experience.midCareer.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    item.byDimension.experience.midCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    item.byDimension.experience.midCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    item.byDimension.experience.midCareer.avg = byExperienceItem.range['50'];
                                }
                            } else {
                                item.byDimension.experience.entryLevel.profileCount = byExperienceItem.profileCount;
                                if(byExperienceItem.range) {
                                    item.byDimension.experience.entryLevel.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                    item.byDimension.experience.entryLevel.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                    item.byDimension.experience.entryLevel.avg = byExperienceItem.range['50'];    
                                }                        
                            }
                        } 
                    }
                }
    
        
                if(byDimension['Health Insurance Overall']) {
                    const byHealthBenefitItems = byDimension['Health Insurance Overall']['rows'];
                    if(byHealthBenefitItems && byHealthBenefitItems.length > 0) {
                        for(let i = 0; i < byHealthBenefitItems.length;i++) {
                            const byHealthBenefitItem = byHealthBenefitItems[i];
                            if(byHealthBenefitItem.name == 'Medical / Health') {
                                item.byDimension.healthBenefit.medical.profileCount = byHealthBenefitItem.profileCount;
                            } else 
                            if(byHealthBenefitItem.name == 'None') {
                                item.byDimension.healthBenefit.none.profileCount = byHealthBenefitItem.profileCount;
                            } else
                            if(byHealthBenefitItem.name == 'Dental') {
                                item.byDimension.healthBenefit.dental.profileCount = byHealthBenefitItem.profileCount;
                            } else
                            if(byHealthBenefitItem.name == 'Vision') {
                                item.byDimension.healthBenefit.vision.profileCount = byHealthBenefitItem.profileCount;
                            }
                        }
                    }
                }
            }


            if(pageData.ratings) {
                item.ratings = {
                    overall: pageData.ratings['Job Satisfaction Overall']
                };
            }

           };
           return item;
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
        item = this.parseRawData(item);
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

       if(!item) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'not found'
        });          
       }

       item = this.parseRawData(item);

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