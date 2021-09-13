import { IndustryModel, Industry, IIndustry } from '../models/industrySchema';
export class IndustryDao {
   public async fetchAll(): Promise<Industry[]> {
        return await IndustryModel.find({}).select('name url category');
   }
   public async fetchById(id: string): Promise<Industry | null> {
        return await IndustryModel.findById(id);
   }

   public async create(data: IIndustry): Promise<Industry | null> {
       return await IndustryModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Industry | null> {
        return await IndustryModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Industry | null> {
        return await IndustryModel.findByIdAndDelete(id);
   } 
   public async deleteAll(): Promise<any> {
     return await IndustryModel.remove({});
   }  
   public async deleteMany(ids: string[]): Promise<any> {
        return await IndustryModel.deleteMany({_id: {$in: ids}});
   }     
}