import { SurveyModel, Survey, ISurvey } from '../models/surveySchema';
export class SurveyDao {
   public async fetchAll(): Promise<Survey[]> {
       return await SurveyModel.find({});
   }
   public async fetchById(id: string): Promise<any> {
    return await SurveyModel.findById(id).populate('job').populate(
        { 
            path: 'city',
            populate: {
                path: 'state', 
                populate: 'country'
            }
        }
    ).lean();
   }

   public async fetchAllByUserId(userId: string): Promise<any[] | null> {
    return await SurveyModel.find({user: userId})
    .populate({ path: 'city', populate: [
        'namet',
        {
            path: 'state', 
            populate: 'country'
        }
    ] })
    .populate({ path: 'job', populate: 'namet' })
    .sort({_id: -1});
   }   

   public async create(data: ISurvey): Promise<Survey | null> {
       return await SurveyModel.create(data);
   }

   public async update(id: string, data: any): Promise<Survey | null> {
    return await SurveyModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   

   public async delete(id: string): Promise<Survey | null> {
    return await SurveyModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
    return await SurveyModel.deleteMany({_id: {$in: ids}});
   }     
}