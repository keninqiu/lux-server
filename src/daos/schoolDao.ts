import { SchoolModel, School, ISchool } from '../models/schoolSchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';
export class SchoolDao {
   public async fetchAll(): Promise<School[]> {
        return await SchoolModel.find({}).select('name slug category url');
   }

   public async fetchAllNotParsed(): Promise<School[]> {
     return await SchoolModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).select('name slug rawDataParsed rawData').limit(10);
   }

   public async fetchCountNotParsed() : Promise<number> {
     return await SchoolModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).count();
   } 

   public async fetchCount(): Promise<number> {
     return await SchoolModel.find({duplicatedWith: null}).count();
   }

   public async fetchSchools(pageNum: number, pageSize: number): Promise<School[]> {
          return await SchoolModel.find({duplicatedWith: null}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).populate('namet').sort('name url category');
   }

   public async fetchAllWithoutDuplicate(): Promise<School[]> {
     return await SchoolModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }

   public async fetchDistinct(): Promise<School[]> {
     return await SchoolModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await SchoolModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<School[]> {
     return await SchoolModel.find({name}).select('_id');
   }

   public async fetchOneByName(name: string): Promise<School | null> {
     return await SchoolModel.findOne({name});
   }

   public async fetchByUrl(url: string) : Promise<School | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          url = url.substring(0, url.indexOf('/Salary')) + '/Salary';
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          url = url.substring(0, url.indexOf('/Hourly_Rate')) + '/Hourly_Rate';
          anotherUrl = url.replace('/Hourly_Rate', '/Salary');
     }
     return await SchoolModel.findOne({$and: [{duplicatedWith: null},{$or: [{url: url},{url: anotherUrl}]}]}).select('_id name');
   }

   public async fetchAllByText(countryCode: string, text: string): Promise<School[]> {
     return await SchoolModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10); 
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<School[]>  {
     const country = await CountryModel.findOne({code: countryCode});
     if(!country) {
          return [];
     }
     const category = await CategoryModel.findOne({type: 'School', country: country._id, slug: categorySlug});
     if(category == null) {
          return [];
     }
     return await SchoolModel.find({category: category._id}).populate('namet').select('name namet slug url category');
   }

   public async fetchAllWithoutRawData(): Promise<School[]> {
     return await SchoolModel.find({rawData: null}).select('name slug url category');
   }
   public async fetchAllWithRawData(): Promise<School[]> {
     return await SchoolModel.find({rawData: { $ne: null }});
   }
   public async fetchAllAndPopulate(): Promise<any[]> {
     return await SchoolModel.find({}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
   }  
    
   public async fetchById(id: string): Promise<School | null> {
        return await SchoolModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<School | null> {
     return await SchoolModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

   public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<School | null> {
     const schools = await SchoolModel.find({$and: [{duplicatedWith: null},{$or: [{slug: slug}, {name: slug}]}]}).populate(
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
                    path: 'school',
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

     if(!schools || schools.length == 0) {
          return null;
     }
     
     const filterSchools = schools.filter(item => 
          {
               const country: any = item.category.country;
               return country.code == countryCode;
          });

     if(!filterSchools || filterSchools.length == 0) {
          return null;
     }     
     return filterSchools[0];
    }

   public async create(data: any): Promise<School | null> {
       return await SchoolModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async deleteAll(): Promise<any> {
     return await SchoolModel.remove({});
   }  

   public async update(id: string, data: any): Promise<School | null> {
        return await SchoolModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async updateByQuery(query: any, data: any): Promise<School | null> {
     return await SchoolModel.findOneAndUpdate(query, data, {new: true});
   }   

   public async delete(id: string): Promise<School | null> {
        return await SchoolModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await SchoolModel.deleteMany({_id: {$in: ids}});
   }     
}