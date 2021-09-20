import { DegreeModel, Degree, IDegree } from '../models/degreeSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class DegreeDao {
   public async fetchAll(): Promise<Degree[]> {
        return await DegreeModel.find({}).select('name url category');
   }
   public async fetchAllWithoutRawData(): Promise<Degree[]> {
     return await DegreeModel.find({rawData: null}).select('name url category');
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Degree[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const category = await CategoryModel.findOne({type: 'Degree', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     console.log('category=', category);
     return await DegreeModel.find({category: category._id}).select('name slug url category');
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