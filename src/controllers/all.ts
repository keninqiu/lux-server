import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { EmployerDao } from "../daos/employerDao";
import { IndustryDao } from "../daos/industryDao";
import { SkillDao } from "../daos/skillDao";
import { CertificationDao } from "../daos/certificationDao";
import { DegreeDao } from "../daos/degreeDao";
import { JobDao } from "../daos/jobDao";
import { SchoolDao } from "../daos/schoolDao";
import { StatusCodes } from 'http-status-codes';

@Controller('api/all')
export class AllController {
    private employerDao = new EmployerDao();
    private jobDao = new JobDao();
    private industryDao = new IndustryDao();
    private skillDao = new SkillDao();
    private certificationDao = new CertificationDao();
    private degreeDao = new DegreeDao();
    private schoolDao = new SchoolDao();

    private escapeRegExp(str: string) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    @Post('search')
    private async fetchAllByText(req: Request, res: Response): Promise<Response> {
        try {
           const body = req.body;
           const type = body.type;
           let text = body.text;
           text = this.escapeRegExp(text);
           
           const countryCode = body.countryCode;
           if(type == 'Employer') {
               const items = await this.employerDao.fetchAllByText(countryCode, text);
               return res.status(StatusCodes.OK).json(
               {
                   success: true,
                   data: items
               });
           } else
           if(type == 'Job') {
            const items = await this.jobDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           }  else
           if(type == 'Industry') {
            const items = await this.industryDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           } else
           if(type == 'Skill') {
            const items = await this.skillDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           } else
           if(type == 'Certification') {
            const items = await this.certificationDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           } else
           if(type == 'Degree') {
            const items = await this.degreeDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           } else
           if(type == 'School') {
            const items = await this.schoolDao.fetchAllByText(countryCode, text);
            return res.status(StatusCodes.OK).json(
            {
                success: true,
                data: items
            });
           } else
           if(type == 'All') {
               const allItems = await Promise.all([
                this.employerDao.fetchAllByText(countryCode, text),
                this.jobDao.fetchAllByText(countryCode, text),
                this.industryDao.fetchAllByText(countryCode, text),
                this.skillDao.fetchAllByText(countryCode, text),
                this.certificationDao.fetchAllByText(countryCode, text),
                this.degreeDao.fetchAllByText(countryCode, text),
                this.schoolDao.fetchAllByText(countryCode, text)
               ]);

               console.log('allItems==', allItems);
               let items: any[] = [];
               allItems.forEach(
                   (item:any) => {
                    items = items.concat(item);
                   }
               );
               return res.status(StatusCodes.OK).json(
                {
                    success: true,
                    data: items
                });               
           }      
           return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'not found'
        });

        } catch (err: any) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                error: err.message,
            });
        }
    }  
}