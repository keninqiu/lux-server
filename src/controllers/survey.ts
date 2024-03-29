import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { SurveyDao } from "../daos/surveyDao";
import auth from '../middlewares/auth';
import { ICustomRequest } from '../interfaces/custom-request';
import { SkillDao } from '../daos/skillDao';
import { CertificationDao } from '../daos/certificationDao';
import { IndustryDao } from '../daos/industryDao';
import { EmployerDao } from '../daos/employerDao';
import { JobDao } from '../daos/jobDao';
import fetch from 'node-fetch';
import { parse, HTMLElement } from 'node-html-parser';

@Controller('api/survey')
export class SurveyController {
    private surveyDao = new SurveyDao();
    private skillDao = new SkillDao();
    private certificationDao = new CertificationDao();
    private industryDao = new IndustryDao();
    private employerDao = new EmployerDao();
    private jobDao = new JobDao();

    @Get('')
    @Middleware([auth])
    private async fetchAll(req: ICustomRequest, res: Response): Promise<Response> {
    try {
        const userId = req.decoded.userId;
       const items = await this.surveyDao.fetchAllByUserId(userId);
       if(!items) {
           return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: []
            }           
           );
       }
       for(let i = 0; i < items.length; i++) {
        let job = items[i].job;
        if(job) {
            if(!job.rawData) {
                const url = job.url;
                if(url) {
                    const response = await fetch('https://www.payscale.com' + url);
        
                    const body = await response.text();
                    
                    const root = parse(body);
                
                    const nextDataNode = root.querySelector('#__NEXT_DATA__');
                
                    if(nextDataNode) {
                        const dataText = nextDataNode.text;
                        const rawData = JSON.parse(dataText);
                        await this.jobDao.update(job._id, {rawData});
                        job.rawData = rawData;
                    }
                }
            }
            job = this.jobDao.parseRawData(job);
           }
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

    @Get(':id')
    private async fetchById(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id;
       let item = await this.surveyDao.fetchById(id);

       if(item && item.job) {
           const jobUrl = item.job.url;
           console.log('jobUrl=', jobUrl);
           const promiseAll: any = [
               this.skillDao.getRelatedByJob(jobUrl), 
               this.certificationDao.getRelatedByJob(jobUrl),
               this.industryDao.getRelatedByJob(jobUrl),
               this.employerDao.getRelatedByJob(jobUrl)
            ];

           const all = await Promise.all(promiseAll);
           item = {
               ...item,
               skills: all[0],
               certifications: all[1],
               industries: all[2],
               employers: all[3]
           };
           /*
            if(!item.job.rawData) {

                const url = item.job.url;
                console.log('url===', url);
                if(url) {
                    const response = await fetch('https://www.payscale.com' + url);
        
                    const body = await response.text();
                    
                    const root = parse(body);
                
                    const nextDataNode = root.querySelector('#__NEXT_DATA__');
                
                    if(nextDataNode) {
                        const dataText = nextDataNode.text;
                        const rawData = JSON.parse(dataText);
                        await this.jobDao.update(item.job._id, {rawData});
                        item.job.rawData = rawData;
                    }
                }
            }
          */
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
    @Middleware([auth])
    private async update(req: Request, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const data = req.body;
            const id = req.params.id;
            const item = await this.surveyDao.update(id, data);
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
    @Middleware([auth])
    private async add(req: ICustomRequest, res: Response) {
        
        try {
            // Parses the request body and assign to the variables on the left.
            const body = req.body;
            const userId = req.decoded.userId;
            body['user'] = userId;
            const item = await this.surveyDao.create(body);
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
    @Middleware([auth])
    private async delete(req: Request, res: Response) {
        
        try {
            const id = req.params.id;
            const item = await this.surveyDao.delete(id);
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
    @Middleware([auth])
    private async deleteMany(req: Request, res: Response) {
        try {
            const ids = req.body;
            const item = await this.surveyDao.deleteMany(ids);
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

}