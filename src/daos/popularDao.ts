import { PopularModel, Popular, IPopular } from '../models/popularSchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class PopularDao {
   public async fetchAll(): Promise<Popular[]> {
        return await PopularModel.find({});
   }
   public async fetchById(id: string): Promise<Popular | null> {
        return await PopularModel.findById(id);
   }
   public async fetchByCode(code: string): Promise<Popular | null> {
     return await PopularModel.findOne({code});
   }
   
   public async fetchByCountryCodeAndType(countryCode: string, type:string): Promise<Popular | null> {
    const country = await CountryModel.findOne({code: countryCode});
    if(!country) {
         return null;
    }
    return await PopularModel.findOne({type, country: country._id});
  }

   public async create(data: IPopular): Promise<Popular | null> {
       return await PopularModel.findOneAndUpdate({type: data.type, country: data.country}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Popular | null> {
        return await PopularModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Popular | null> {
        return await PopularModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await PopularModel.deleteMany({_id: {$in: ids}});
   }     

   public async deleteAll(): Promise<any> {
     return await PopularModel.deleteMany({});
   }    
}