import { CertificationModel, Certification, ICertification } from '../models/certificationSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class CertificationDao {
   public async fetchAll(): Promise<Certification[]> {
        return await CertificationModel.find({}).select('name url category');
   }
   public async fetchAllWithoutRawData(): Promise<Certification[]> {
     return await CertificationModel.find({rawData: null}).select('name url category');
   }
   public async fetchAllByText(countryCode: string, text: string): Promise<Certification[]> {
     return await CertificationModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10);
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Certification[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     console.log('countryCode==', countryCode);
     if(!country) {
          return [];
     }
     console.log('country=', country);
     const category = await CategoryModel.findOne({type: 'Certification', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     console.log('category=', category);
     return await CertificationModel.find({category: category._id}).select('name slug url category');
   }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Certification | null> {
     const items = await CertificationModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
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

   public async fetchById(id: string): Promise<Certification | null> {
        return await CertificationModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Certification | null> {
     return await CertificationModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

   public async create(data: any): Promise<Certification | null> {
       return await CertificationModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Certification | null> {
        return await CertificationModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async updateByQuery(query: any, data: any): Promise<Certification | null> {
     return await CertificationModel.findOneAndUpdate(query, data, {new: true});
   }  

   public async delete(id: string): Promise<Certification | null> {
        return await CertificationModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await CertificationModel.remove({});
   }  
   public async deleteMany(ids: string[]): Promise<any> {
        return await CertificationModel.deleteMany({_id: {$in: ids}});
   }     
}