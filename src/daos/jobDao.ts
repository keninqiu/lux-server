import { JobModel, Job, IJob } from '../models/jobSchema';
export class JobDao {
   public async fetchAll(): Promise<Job[]> {
        return await JobModel.find({}).select('name url category');
   }
   public async fetchAllWithoutRawData(): Promise<Job[]> {
     return await JobModel.find({rawData: null}).select('name url category');
   }
   public async fetchById(id: string): Promise<Job | null> {
        return await JobModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Job | null> {
     return await JobModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

   public async create(data: any): Promise<Job | null> {
       return await JobModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Job | null> {
        return await JobModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   

   public async updateByQuery(query: any, data: any): Promise<Job | null> {
     return await JobModel.findOneAndUpdate(query, data, {new: true});
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