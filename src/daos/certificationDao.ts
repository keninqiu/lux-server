import { CertificationModel, Certification, ICertification } from '../models/certificationSchema';
export class CertificationDao {
   public async fetchAll(): Promise<Certification[]> {
        return await CertificationModel.find({});
   }
   public async fetchById(id: string): Promise<Certification | null> {
        return await CertificationModel.findById(id);
   }

   public async create(data: ICertification): Promise<Certification | null> {
       return await CertificationModel.findOneAndUpdate({name: data.name, category: data.category}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Certification | null> {
        return await CertificationModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Certification | null> {
        return await CertificationModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await CertificationModel.remove({});
   }  
   public async deleteMany(ids: string[]): Promise<any> {
        return await CertificationModel.deleteMany({_id: {$in: ids}});
   }     
}