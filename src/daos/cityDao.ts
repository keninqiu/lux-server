import { CountryModel, Country, ICountry } from '../models/countrySchema';
import { StateModel, State, IState } from '../models/stateSchema';
import { CityModel, City, ICity } from '../models/citySchema';
import { TranslateModel, Translate, ITranslate } from '../models/translateSchema';

export class CityDao {
   public async fetchAll(): Promise<City[]> {
        return await CityModel.find({}).populate('namet').select('name namet state url');
   }

   public async fetchByName(countryName: string, cityName: string): Promise<City[]> {
     const translates = await TranslateModel.find({$and: [{type: 'Country'}, {$or: [{en: { "$regex": countryName, "$options": "i" }}, {zh: { "$regex": countryName, "$options": "i" }}]}]});
     if(translates && translates.length > 0) {
          const namets = translates.map(item => item._id);
          const countries = await CountryModel.find({namet: {$in:namets}});
          const countryIds = countries.map(item => item._id);
          const states = await StateModel.find({country: {$in: countryIds}});
          if(states && states.length > 0) {
               const stateIds = states.map(item => item._id);
               const translateCities = await TranslateModel.find({$and: [{type: 'City'}, {$or: [{en: { "$regex": cityName, "$options": "i" }}, {zh: { "$regex": cityName, "$options": "i" }}]}]});
               if(translateCities && translateCities.length > 0) {
                    const nametCities = translateCities.map(item => item._id);
                    return await CityModel.find({namet: {$in:nametCities}, state: {$in: stateIds}}).populate('namet').populate({path: 'state', populate: 'namet'}).select('name namet state').sort('name');
               }
          }
     }
     return [];
    }

   public async fetchCount(): Promise<number> {
     return await CityModel.find({}).count();
   }

   public async fetchCities(pageNum: number, pageSize: number): Promise<City[]> {
          return await CityModel.find({}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).populate('namet').populate('state').sort('name namet url category');
   }

   public async fetchDistinct(): Promise<City[]> {
     return await CityModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await CityModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<City[]> {
     return await CityModel.find({name}).select('_id');
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