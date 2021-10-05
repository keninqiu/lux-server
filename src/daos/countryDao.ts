import { CountryModel, Country, ICountry } from '../models/countrySchema';
export class CountryDao {
   public async fetchAll(): Promise<Country[]> {
        return await CountryModel.find({}).populate('namet').select('name namet code url').sort('name');
   }
   public async fetchById(id: string): Promise<Country | null> {
        return await CountryModel.findById(id);
   }

   public async fetchDistinct(): Promise<Country[]> {
     return await CountryModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await CountryModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<Country[]> {
     return await CountryModel.find({name}).select('_id');
   }

   public async fetchByCode(code: string): Promise<Country | null> {
     return await CountryModel.findOne({code}).populate('namet').populate(
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
                    },
                    {
                         path: 'salaryBySchool', 
                         populate: {
                              path: 'school',
                              select: 'namet',
                              populate: {
                                   path: 'namet',
                                   select: 'zh'
                              }
                         }
                    },
                    {
                         path: 'hourlyRateBySchool', 
                         populate: {
                              path: 'school',
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
   }
   
   public async create(data: ICountry): Promise<Country | null> {
       return await CountryModel.findOneAndUpdate({name: data.name}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Country | null> {
        return await CountryModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Country | null> {
        return await CountryModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await CountryModel.deleteMany({_id: {$in: ids}});
   }     

   public async deleteAll(): Promise<any> {
     return await CountryModel.deleteMany({});
   }    
}