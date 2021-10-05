import { JobModel, Job, IJob } from '../models/jobSchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
export class JobDao {
   public async fetchAll(): Promise<Job[]> {
        return await JobModel.find({}).select('name url category').limit(1000);
   }
   public async fetchAllWithoutDuplicate(): Promise<Job[]> {
     return await JobModel.find({duplicatedWith: null}).populate('namet').select('name namet url category').limit(1000);
   }

   public async fetchByUrl(url: string) : Promise<Job | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          anotherUrl = url.replace('/Hourly_Rate', '/Salary');
     }
     return await JobModel.findOne({$and: [{duplicatedWith: null},{$or: [{url: url},{url: anotherUrl}]}]}).select('_id name');
   }

   public async fetchAllByText(countryCode: string, text: string): Promise<Job[]> {
     return await JobModel.find({$and: [{url: {$regex : '/' + countryCode + '/'}},{ name: { $regex : new RegExp(text, "i") } }]}).select('name url').limit(10); 
   }

   public async fetchAllByCountryCodeAndCategorySlug(countryCode: string, categorySlug: string): Promise<Job[]>  {
     console.log('countryCode==');
     const country = await CountryModel.findOne({code: countryCode});
     console.log('country=', country);
     if(!country) {
          return [];
     }
     
     const category = await CategoryModel.findOne({type: 'Job', country: country._id, slug: categorySlug});
     console.log('category=', category);
     if(category == null) {
          return [];
     }

     return await JobModel.find({category: category._id}).populate('namet').select('name namet slug url category');
   }   

   public async fetchAllWithoutRawData(): Promise<Job[]> {
     return await JobModel.find({rawData: null}).select('name url category');
   }

   public async fetchById(id: string): Promise<Job | null> {
        return await JobModel.findById(id);
   }

   public async fetchByIdAndPopulate(id: string): Promise<Job | null> {
     return await JobModel.findById(id).populate(
          {
               path: 'category',
               populate: 'country'
          }
     );
    }

    public async fetchByCountryCodeAndySlugAndPopulate(countryCode: string, slug: string): Promise<Job | null> {
     const jobs = await JobModel.find({$or: [{slug: slug}, {name: slug}]}).populate(
          {
               path: 'category',
               populate: 'country'
          }
     ).populate('namet');

     if(!jobs || jobs.length == 0) {
          return null;
     }
     
     const filterJobs = jobs.filter(item => 
          {
               const country: any = item.category.country;
               return country.code == countryCode;
          });

     if(!filterJobs || filterJobs.length == 0) {
          return null;
     }     
     return filterJobs[0];
    }

   public async create(data: any): Promise<Job | null> {
       return await JobModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Job | null> {
        return await JobModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   

   public async updateByQuery(query: any, data: any): Promise<Job | null> {
     return await JobModel.findOneAndUpdate(query, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Job | null> {
        return await JobModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
     return await JobModel.remove({});
   }  

   public async deleteMany(ids: string[]): Promise<any> {
        return await JobModel.deleteMany({_id: {$in: ids}});
   }     
}