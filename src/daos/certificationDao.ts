import { CertificationModel, Certification, ICertification } from '../models/certificationSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class CertificationDao {
   public async fetchAll(): Promise<Certification[]> {
        return await CertificationModel.find({}).select('name url category');
   }

   public async fetchAllNotParsed(): Promise<Certification[]> {
     return await CertificationModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).limit(10);
   }

   public async fetchCountNotParsed() : Promise<number> {
     return await CertificationModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).count();
   } 

   public async fetchCount(): Promise<number> {
     return await CertificationModel.find({duplicatedWith: null}).count();
   }

   public async getRelatedByJob(jobUrl: string): Promise<Certification[]> {

     return await CertificationModel.find({$or: [{'byDimension.salaryByJob.url': new RegExp(jobUrl, 'gi')}, {'byDimension.hourlyRateByJob.url': new RegExp(jobUrl, 'gi')}]}).populate('namet').select('name namet');
   }

   public async fetchCertifications(pageNum: number, pageSize: number): Promise<Certification[]> {
          return await CertificationModel.find({duplicatedWith: null}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).populate('namet').sort('name namet url');
   }

   public async fetchAllWithoutDuplicate(): Promise<Certification[]> {
     return await CertificationModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }

   public async fetchDistinct(): Promise<Certification[]> {
     return await CertificationModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await CertificationModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<Certification[]> {
     return await CertificationModel.find({name}).select('_id');
   }

   public async fetchByUrl(url: string) : Promise<Certification | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          url = url.substring(0, url.indexOf('/Salary')) + '/Salary';
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          url = url.substring(0, url.indexOf('/Hourly_Rate')) + '/Hourly_Rate';
          anotherUrl = url.replace('/Hourly_Rate', '/Salary');
     }
     return await CertificationModel.findOne({$and: [{duplicatedWith: null},{$or: [{url: url},{url: anotherUrl}]}]}).select('_id name');
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
     return await CertificationModel.find({category: category._id}).populate('namet').select('name namet slug url category');
   }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Certification | null> {
     const items = await CertificationModel.find({$and: [{duplicatedWith: null},{$or: [{slug: slug}, {name: slug}]}]}).populate(
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
                    path: 'certification',
                    select: 'namet',
                    populate: {
                         path: 'namet',
                         select: 'zh'
                    }
               }               
          }
     )
     .populate(
          {
               path: 'byDimension', 
               populate: [
                    {
                         path: 'salaryByJob', 
                         populate: {
                              path: 'job',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    },
                    {
                         path: 'hourlyRateByJob', 
                         populate: {
                              path: 'job',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    },
                    {
                         path: 'salaryByEmployer', 
                         populate: {
                              path: 'employer',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    },
                    {
                         path: 'hourlyRateByEmployer', 
                         populate: {
                              path: 'employer',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    }                   
               ]
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
     return await CertificationModel.updateMany(query, data);
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