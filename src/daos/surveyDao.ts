import { SurveyModel, Survey, ISurvey } from '../models/surveySchema';
export class SurveyDao {
   public async fetchAll(): Promise<Survey[]> {
       return await SurveyModel.find({});
   }
   public async fetchById(id: string): Promise<any> {
    return await SurveyModel.findById(id).populate('job').lean();
   }

   public async fetchAllByUserId(userId: string): Promise<Survey[] | null> {
    return await SurveyModel.find({user: userId});
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