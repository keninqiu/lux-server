import { EmployerModel, Employer, IEmployer } from '../models/employerSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';

export class EmployerDao {
   public async fetchAll(): Promise<Employer[]> {
        return await EmployerModel.find({}).select('name url category');
   }

   public async fetchAllNotParsed(): Promise<Employer[]> {
     return await EmployerModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).select('name slug rawDataParsed rawData').limit(10);
   }

   public async fetchCountNotParsed() : Promise<number> {
     return await EmployerModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).count();
   } 

   public async fetchCount(): Promise<number> {
     return await EmployerModel.find({duplicatedWith: null}).count();
   }

   public async getRelatedByJob(jobUrl: string): Promise<Employer[]> {
     const employers = await EmployerModel.find({$or: [{'byDimension.salaryByJob.url': new RegExp(jobUrl, 'gi')}, {'byDimension.hourlyRateByJob.url': new RegExp(jobUrl, 'gi')}]}).populate('namet').select('name namet');
     console.log('employers=', employers);
     return employers;
   }

   public async fetchEmployers(pageNum: number, pageSize: number): Promise<Employer[]> {
          return await EmployerModel.find({duplicatedWith: null}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).sort('name url category').populate('namet').sort('name namet url');
   }

   public async fetchAllWithoutDuplicate(): Promise<Employer[]> {
     return await EmployerModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }

   public async fetchDistinct(): Promise<Employer[]> {
     return await EmployerModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await EmployerModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<Employer[]> {
     return await EmployerModel.find({name}).select('_id');
   }

   public async fetchByUrl(url: string) : Promise<Employer | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          url = url.substring(0, url.indexOf('/Salary')) + '/Salary';
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          url = url.substring(0, url.indexOf('/Hourly_Rate')) + '/Hourly_Rate';
          anotherUrl = url.replace('/Hourly_Rate', '/Salary');
     }
     return await EmployerModel.findOne({$and: [{duplicatedWith: null},{$or: [{url: url},{url: anotherUrl}]}]}).select('_id name');
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
     console.log('category 4444444=', category);
     const items = await EmployerModel.find({category: category._id}).populate('namet').select('name namet slug url category');
     console.log('items=', items);
     return items;
   }
   
   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Employer | null> {
     const items = await EmployerModel.find({$and: [{duplicatedWith: null},{$or: [{slug: slug}, {name: slug}]}]}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     ).populate('namet')
     .populate(
          {
               path: 'related',
               populate: {
                    path: 'employer',
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
                         path: 'salaryByDegree', 
                         populate: {
                              path: 'degree',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    },
                    {
                         path: 'hourlyRateByDegree', 
                         populate: {
                              path: 'degree',
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