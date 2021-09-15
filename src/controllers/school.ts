import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { StatusCodes } from 'http-status-codes';
import { SchoolDao } from "../daos/schoolDao";
import authAdmin from '../middlewares/auth-admin';
import { ICustomRequest } from '../interfaces/custom-request';

@Controller('api/school')
export class SchoolController {
    private dao = new SchoolDao();

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

    @Get('all/withRawData')
    private async fetchAllWithRawData(req: ICustomRequest, res: Response): Promise<Response> {
    try {
       const items = await this.dao.fetchAllWithRawData();
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
       if(!item) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'not found'
        });          
       }
       if(item.rawData) {
           const pageProps = item.rawData.props.pageProps;
           const collegeData = pageProps;
            if(!item.about) {
                const about = collegeData.about;
                if(about) {
                    item.about = {
                        abstract: about.abstract,
                        website: about.website,
                        admissionsUrl: about.admissionsUrl,
                        streetAddress: about.streetAddress,
                        graduationRate: about.graduationRate ? about.graduationRate.split('%')[0] : 0,
                        percentStayInState: about.percentStayInState ? about.percentStayInState.split('%')[0] : 0,
                        percentStem: about.percentStem ? about.percentStem.split('%')[0] : 0,
                        percentReceivingPellGrants: about.percentReceivingPellGrants ? about.percentReceivingPellGrants.split('%')[0] : 0,
                        city: about.city,
                        state: about.state,
                        zip: about.zip,
                        wikiUrl: about.wikiUrl,
                        studentsEnrolled: about.studentsEnrolled ? about.studentsEnrolled.split(',').join('') : 0,
                        satScores: about.satScores,
                        actScores: about.actScores
                    };
                }
            }
            if(!item.compensation) {

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