import { DegreeModel, Degree, IDegree } from '../models/degreeSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class DegreeDao {
   public async fetchAll(): Promise<Degree[]> {
        return await DegreeModel.find({}).select('name url slug category');
   }
   public async fetchAllWithoutDuplicate(): Promise<Degree[]> {
     return await DegreeModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }
   public async fetchAllWithoutRawData(): Promise<Degree[]> {
     return await DegreeModel.find({rawData: null}).select('name url category slug');
   }
   public async fetchAllByText(countryCode: string, text: string): Promise<Degree[]> {
     return await DegreeModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10); 
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
     return await DegreeModel.find({category: category._id}).populate('namet').select('name namet slug url category');
   }

   public async fetchAllByCountryCode(countryCode: string): Promise<Degree[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const categories = await CategoryModel.find({type: 'Degree', country: country._id});
     if(categories == null) {
          return [];
     }
     console.log('categories=', categories);
     const categoryIds = categories.map(item => item._id);
     return await DegreeModel.find({category: { "$in" : categoryIds}}).select('name slug url category');
   }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Degree | null> {
     const items = await DegreeModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );

     console.log('items===', items);
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

   public async fetchById(id: string): Promise<Degree | null> {
        return await DegreeModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Degree | null> {
     return await DegreeModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

   public async updateByQuery(query: any, data: any): Promise<Degree | null> {
     return await DegreeModel.findOneAndUpdate(query, data, {new: true});
   }  

   public async create(data: any): Promise<Degree | null> {
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