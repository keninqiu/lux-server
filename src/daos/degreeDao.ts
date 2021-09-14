import { DegreeModel, Degree, IDegree } from '../models/degreeSchema';
export class DegreeDao {
   public async fetchAll(): Promise<Degree[]> {
        return await DegreeModel.find({}).select('name url category');
   }
   public async fetchById(id: string): Promise<Degree | null> {
        return await DegreeModel.findById(id);
   }

   public async create(data: IDegree): Promise<Degree | null> {
       return await DegreeModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Degree | null> {
        return await DegreeModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Degree | null> {
        return await DegreeModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await DegreeModel.deleteMany({_id: {$in: ids}});
   }     

   public async deleteAll(): Promise<any> {
     return await DegreeModel.remove({});
   }  
}