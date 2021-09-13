import { CountryModel, Country, ICountry } from '../models/countrySchema';
export class CountryDao {
   public async fetchAll(): Promise<Country[]> {
        return await CountryModel.find({});
   }
   public async fetchById(id: string): Promise<Country | null> {
        return await CountryModel.findById(id);
   }

   public async create(data: ICountry): Promise<Country | null> {
       return await CountryModel.findOneAndUpdate({name: data.name}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Country | null> {
        return await CountryModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Country | null> {
        return await CountryModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await CountryModel.deleteMany({_id: {$in: ids}});
   }     

   public async deleteAll(): Promise<any> {
     return await CountryModel.deleteMany({});
   }    
}