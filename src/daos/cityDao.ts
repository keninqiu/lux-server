import { CityModel, City, ICity } from '../models/citySchema';
export class CityDao {
   public async fetchAll(): Promise<City[]> {
        return await CityModel.find({}).select('name state url');
   }
   public async fetchAllWithoutRawData(): Promise<City[]> {
     return await CityModel.find({rawData: null}).select('name state url');
   }
   
   public async fetchById(id: string): Promise<City | null> {
        return await CityModel.findById(id);
   }

   public async create(data: ICity): Promise<City | null> {
       return await CityModel.findOneAndUpdate({name: data.name, state: data.state}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<City | null> {
        return await CityModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<City | null> {
        return await CityModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await CityModel.deleteMany({_id: {$in: ids}});
   }   
   
   public async deleteAll(): Promise<any> {
        return await CityModel.deleteMany({});
   }  
}