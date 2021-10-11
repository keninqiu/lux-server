import { IndustryModel, Industry, IIndustry } from '../models/industrySchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class IndustryDao {
   public async fetchAll(): Promise<Industry[]> {
        return await IndustryModel.find({}).select('name url category');
   }

   public async fetchCount(): Promise<number> {
     return await IndustryModel.find({duplicatedWith: null}).count();
   }

   public async fetchIndustries(pageNum: number, pageSize: number): Promise<Industry[]> {
          return await IndustryModel.find({duplicatedWith: null}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).sort('name url category').populate('namet').sort('name namet url');
   }

   public async fetchAllWithoutDuplicate(): Promise<Industry[]> {
     return await IndustryModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }

   public async fetchDistinct(): Promise<Industry[]> {
     return await IndustryModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await IndustryModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<Industry[]> {
     return await IndustryModel.find({name}).select('_id');
   }

   public async fetchByUrl(url: string) : Promise<Industry | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          url = url.substring(0, url.indexOf('/Salary')) + '/Salary';
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          url = url.substring(0, url.indexOf('/Hourly_Rate')) + '/Hourly_Rate';
          anotherUrl = url.replace('/Hourly_Rate', '/Salary');
     }
     return await IndustryModel.findOne({$and: [{duplicatedWith: null},{$or: [{url: url},{url: anotherUrl}]}]}).select('_id name');
   }

   public async fetchAllByText(countryCode: string, text: string): Promise<Industry[]> {
     return await IndustryModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10);
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
     return await IndustryModel.find({category: category._id}).populate('namet').select('name namet slug url category');
   }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Industry | null> {
     const items = await IndustryModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     )
     .populate('namet')
     .populate(
          {
               path: 'related',
               populate: {
                    path: 'degree',
                    select: 'namet',
                    populate: {
                         path: 'namet',
                         select: 'zh'
                    }
               }               
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

   public async fetchByIdAndPopulate(id: string): Promise<Industry | null> {
     return await IndustryModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
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