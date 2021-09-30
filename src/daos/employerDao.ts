import { EmployerModel, Employer, IEmployer } from '../models/employerSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class EmployerDao {
   public async fetchAll(): Promise<Employer[]> {
        return await EmployerModel.find({}).select('name url category');
   }

   public async fetchAllByText(countryCode: string, text: string): Promise<Employer[]> {
     return await EmployerModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10); 
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Employer[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const categories = await CategoryModel.find({country: country._id, slug: categorySlug});
     console.log('categories====', categories);
     const category = await CategoryModel.findOne({type: 'Employer', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     console.log('category=', category);
     return await EmployerModel.find({category: category._id}).select('name slug url category');
   }
   
   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Employer | null> {
     const items = await EmployerModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
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

   public async fetchAllWithoutRawData(): Promise<Employer[]> {
     return await EmployerModel.find({rawData: null}).select('name url category');
   }
   public async fetchById(id: string): Promise<Employer | null> {
        return await EmployerModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Employer | null> {
     return await EmployerModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }
    
   public async create(data: any): Promise<Employer | null> {
       return await EmployerModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Employer | null> {
        return await EmployerModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Employer | null> {
        return await EmployerModel.findByIdAndDelete(id);
   } 

   public async updateByQuery(query: any, data: any): Promise<Employer | null> {
     return await EmployerModel.updateMany(query, data);
   }   

   public async deleteAll(): Promise<any> {
     return await EmployerModel.remove({});
   }  

   public async deleteMany(ids: string[]): Promise<any> {
        return await EmployerModel.deleteMany({_id: {$in: ids}});
   }     
}