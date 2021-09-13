import { JobModel, Job, IJob } from '../models/jobSchema';
export class JobDao {
   public async fetchAll(): Promise<Job[]> {
        return await JobModel.find({});
   }
   public async fetchById(id: string): Promise<Job | null> {
        return await JobModel.findById(id);
   }

   public async create(data: IJob): Promise<Job | null> {
       return await JobModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Job | null> {
        return await JobModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Job | null> {
        return await JobModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await JobModel.remove({});
   }  

   public async deleteMany(ids: string[]): Promise<any> {
        return await JobModel.deleteMany({_id: {$in: ids}});
   }     
}