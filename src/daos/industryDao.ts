import { IndustryModel, Industry, IIndustry } from '../models/industrySchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class IndustryDao {
   public async fetchAll(): Promise<Industry[]> {
        return await IndustryModel.find({}).select('name url category');
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Industry[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const category = await CategoryModel.findOne({type: 'Industry', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     console.log('category=', category);
     return await IndustryModel.find({category: category._id}).select('name slug url category');
   }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Industry | null> {
     const items = await IndustryModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );

     if(!items || items.length == 0) {
          return null;
     }
     
     const filterItems = items.filter(item => 
          {
               const country: any = item.category.country;
               return country.code == countryCode;
          });

     if(!filterItems || filterItems.length == 0) {
          return null;
     }     
     return filterItems[0];
    }

   public async fetchAllWithoutRawData(): Promise<Industry[]> {
     return await IndustryModel.find({rawData: null}).select('name url category');
   }
   public async fetchById(id: string): Promise<Industry | null> {
        return await IndustryModel.findById(id);
   }

   public async create(data: any): Promise<Industry | null> {
       return await IndustryModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Industry | null> {
        return await IndustryModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async updateByQuery(query: any, data: any): Promise<Industry | null> {
     return await IndustryModel.findOneAndUpdate(query, data, {new: true});
   }  

   public async delete(id: string): Promise<Industry | null> {
        return await IndustryModel.findByIdAndDelete(id);
   } 
   public async deleteAll(): Promise<any> {
     return await IndustryModel.remove({});
   }  
   public async deleteMany(ids: string[]): Promise<any> {
        return await IndustryModel.deleteMany({_id: {$in: ids}});
   }     
}