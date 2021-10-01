import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { CertificationDao } from "../daos/certificationDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';

@Controller('api/certification')
export class CertificationController {
    private dao = new CertificationDao();

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
    
    private parseRawData(item: any) {
        if(!item) {
            return item;
        }
        if(item.rawData &&  !item.rawDataParsed) {
            const pageProps = item.rawData.props.pageProps;
            //const collegeData = pageProps.collegeData;
            const pageData = pageProps.pageData;
            //const about = collegeData.about;
            item.currencyCode = pageData.currencyCode;
            const compensation = pageData.compensation;
            const byDimension = pageData.byDimension;
            item.reviews = pageProps.reviews;
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
                    }
                },                
                salaryByJob: [],
                salaryByDegree: [],
                hourlyRateByEmployer: [],
                salaryByEmployer:[]
            };

            if(byDimension) {
                if(byDimension['Average Salary by Gender'] || byDimension['Average Hourly Rate by Gender']) {
                    const byGenderItems = 
                    byDimension['Average Salary by Gender'] ? 
                    byDimension['Average Salary by Gender']['rows'] :
                    byDimension['Average Hourly Rate by Gender']['rows'];
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
                            }
                        }
                    }
                }

            if(byDimension['Average Salary by Years_Experience Range'] || byDimension['Average Hourly Rate by Years_Experience Range']) {
                const byExperienceItems = 
                byDimension['Average Salary by Years_Experience Range'] ?
                byDimension['Average Salary by Years_Experience Range']['rows'] :
                byDimension['Average Hourly Rate by Years_Experience Range']['rows'];
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

            if(byDimension['Average Salary by Job'] || byDimension['Average Hourly Rate by Job']) {
                const salaryByJobItems = 
                byDimension['Average Salary by Job'] ?
                byDimension['Average Salary by Job']['rows'] :
                byDimension['Average Hourly Rate by Job']['rows'];
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
                        item.byDimension.salaryByJob.push(byDimensionItem);
                    }
                }  
            }
   
            
            if(byDimension['Average Salary by Employer']) {
                const salaryByEmployerItems = byDimension['Average Salary by Employer']['rows'];
                if(salaryByEmployerItems && salaryByEmployerItems.length > 0) {
                    for(let i = 0; i < salaryByEmployerItems.length;i++) {
                        const salaryByEmployerItem = salaryByEmployerItems[i];
                        const byDimensionItem = {
                            name: salaryByEmployerItem.name,
                            url: salaryByEmployerItem.url,
                            avg: salaryByEmployerItem.range['50'],
                            min: salaryByEmployerItem.range['10'] ? salaryByEmployerItem.range['10'] : (salaryByEmployerItem.range['25'] ? salaryByEmployerItem.range['25'] : 0),
                            max: salaryByEmployerItem.range['90'] ? salaryByEmployerItem.range['90'] : (salaryByEmployerItem.range['75'] ? salaryByEmployerItem.range['75'] : 0)
                        }
                        item.byDimension.salaryByEmployer.push(byDimensionItem);
                    }
                }  
            }
               
            if(byDimension['Average Hourly Rate by Employer']) {
                const hourlyRateByEmployerItems = byDimension['Average Hourly Rate by Employer']['rows'];
                if(hourlyRateByEmployerItems && hourlyRateByEmployerItems.length > 0) {
                    for(let i = 0; i < hourlyRateByEmployerItems.length;i++) {
                        const hourlyRateByEmployerItem = hourlyRateByEmployerItems[i];
                        const byDimensionItem = {
                            name: hourlyRateByEmployerItem.name,
                            url: hourlyRateByEmployerItem.url,
                            avg: hourlyRateByEmployerItem.range['50'],
                            min: hourlyRateByEmployerItem.range['10'] ? hourlyRateByEmployerItem.range['10'] : (hourlyRateByEmployerItem.range['25'] ? hourlyRateByEmployerItem.range['25'] : 0),
                            max: hourlyRateByEmployerItem.range['90'] ? hourlyRateByEmployerItem.range['90'] : (hourlyRateByEmployerItem.range['75'] ? hourlyRateByEmployerItem.range['75'] : 0)
                        }
                        item.byDimension.hourlyRateByEmployer.push(byDimensionItem);
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
                   item.related.push(relatedItemChanged);
               }
            }  
            if(pageData.ratings && pageData.ratings['Job Satisfaction Overall']) {
                item.ratings.jobSatisfaction = pageData.ratings['Job Satisfaction Overall'];
            }

            

            console.log('item.ratings', item.ratings);
            console.log('item===', item);
        }

        
        return item;
    }

    @Get('countryCode/:countryCode/slug/:slug')
    private async fetchByCountryCodeAndSlug(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const countryCode = req.params.countryCode;
       let slug:string = req.params.slug;

       slug = encodeURIComponent(slug);

       let item = await this.dao.fetchByCountryCodeAndySlugAndPopulate(countryCode, slug);
       console.log('item in here===', item);
       item = this.parseRawData(item);
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
       item = this.parseRawData(item);
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