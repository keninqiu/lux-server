import { EmployerModel, Employer, IEmployer } from '../models/employerSchema';
export class EmployerDao {
   public async fetchAll(): Promise<Employer[]> {
        return await EmployerModel.find({}).select('name url category');
   }
   public async fetchById(id: string): Promise<Employer | null> {
        return await EmployerModel.findById(id);
   }

   public async create(data: IEmployer): Promise<Employer | null> {
       return await EmployerModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Employer | null> {
        return await EmployerModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Employer | null> {
        return await EmployerModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await EmployerModel.remove({});
   }  

   public async deleteMany(ids: string[]): Promise<any> {
        return await EmployerModel.deleteMany({_id: {$in: ids}});
   }     
}