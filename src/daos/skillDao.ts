import { SkillModel, Skill, ISkill } from '../models/skillSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class SkillDao {
   public async fetchAll(): Promise<Skill[]> {
        return await SkillModel.find({}).select('name url category');
   }
   public async fetchAllWithoutDuplicate(): Promise<Skill[]> {
     return await SkillModel.find({duplicatedWith: null}).select('name url category');
   }
   public async fetchAllByText(countryCode: string, text: string): Promise<Skill[]> {
     return await SkillModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10); 
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Skill[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const category = await CategoryModel.findOne({type: 'Skill', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     console.log('category=', category);
     return await SkillModel.find({category: category._id}).select('name slug url category');
   }   

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Skill | null> {
     const items = await SkillModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
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

   public async fetchAllWithoutRawData(): Promise<Skill[]> {
     return await SkillModel.find({rawData: null}).select('name url category');
   }

   public async fetchById(id: string): Promise<Skill | null> {
        return await SkillModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Skill | null> {
     return await SkillModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

   public async create(data: any): Promise<Skill | null> {
       return await SkillModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Skill | null> {
        return await SkillModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async updateByQuery(query: any, data: any): Promise<Skill | null> {
     return await SkillModel.findOneAndUpdate(query, data, {new: true});
   }  

   public async delete(id: string): Promise<Skill | null> {
        return await SkillModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await SkillModel.remove({});
   }  

   public async deleteMany(ids: string[]): Promise<any> {
        return await SkillModel.deleteMany({_id: {$in: ids}});
   }     
}