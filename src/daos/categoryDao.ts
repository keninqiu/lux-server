import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';
export class CategoryDao {
   public async fetchAll(): Promise<Category[]> {
        return await CategoryModel.find({}).populate('namet').sort('name');
   }

   public async fetchAllWithoutRawData(): Promise<Category[]> {
     return await CategoryModel.find({rawData: null}).select('name url');
   }

   public async fetchAllByCountryAndType(countryId: string, type: string): Promise<Category[]> {
     return await CategoryModel.find({country: countryId, type}).populate('namet').select('name namet url').sort('name');
   }

   public async fetchAllByCountryCodeAndType(countryCode: string, type: string): Promise<Category[]> {
        const country = await CountryModel.findOne({code: countryCode});
        if(!country) {
             return [];
        }
        return await this.fetchAllByCountryAndType(country._id, type);
   }

   public async fetchByCountryCodeAndTypeSlug(countryCode: string, type: string, slug: string): Promise<Category | null> {
        const country = await CountryModel.findOne({code: countryCode});
        if(!country) {
             return null;
        }
        return await CategoryModel.findOne({country: country._id, type, slug: slug}).populate({
             path:'country',populate: 'namet'
             }).populate('namet');
   }

   public async fetchAllByType(type: string): Promise<Category[]> {
    return await CategoryModel.find({type}).sort('name');
   }

   public async fetchAllByTypePopulate(type: string): Promise<any[]> {
    return await CategoryModel.find({type}).populate('country').sort('name');
   }

   public async fetchById(id: string): Promise<Category | null> {
        return await CategoryModel.findById(id);
   }

   public async create(data: ICategory): Promise<Category | null> {
       return await CategoryModel.findOneAndUpdate({name: data.name, type: data.type, url: data.url, country: data.country}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Category | null> {
        return await CategoryModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   

   public async updateByQuery(query: any, data: any): Promise<Category | null> {
     return await CategoryModel.updateMany(query, data, {new: true});
   }   

   public async delete(id: string): Promise<Category | null> {
        return await CategoryModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await CategoryModel.deleteMany({_id: {$in: ids}});
   }   
   
   public async deleteAll(): Promise<any> {
        return await CategoryModel.deleteMany({});
   }  
   public async deleteAllByType(type: string): Promise<any> {
    return await CategoryModel.deleteMany({type});
   }  
}