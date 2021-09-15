import { SchoolModel, School, ISchool } from '../models/schoolSchema';
export class SchoolDao {
   public async fetchAll(): Promise<School[]> {
        return await SchoolModel.find({}).select('name url category');
   }
   public async fetchAllWithoutRawData(): Promise<School[]> {
     return await SchoolModel.find({rawData: null}).select('name url category');
   }
   public async fetchAllWithRawData(): Promise<School[]> {
     return await SchoolModel.find({rawData: { $ne: null }});
   }
   public async fetchAllAndPopulate(): Promise<any[]> {
     return await SchoolModel.find({}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
   }  
    
   public async fetchById(id: string): Promise<School | null> {
        return await SchoolModel.findById(id);
   }

   public async create(data: any): Promise<School | null> {
       return await SchoolModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async deleteAll(): Promise<any> {
     return await SchoolModel.remove({});
   }  

   public async update(id: string, data: any): Promise<School | null> {
        return await SchoolModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<School | null> {
        return await SchoolModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await SchoolModel.deleteMany({_id: {$in: ids}});
   }     
}