import { JobModel, Job, IJob } from '../models/jobSchema';
import { CountryModel, Country, ICountry } from '../models/countrySchema';
import { CategoryModel, Category, ICategory } from '../models/categorySchema';
import { TranslateModel, Translate, ITranslate } from '../models/translateSchema';

export class JobDao {
   public async fetchAll(): Promise<Job[]> {
        return await JobModel.find({}).select('name url category');
   }

   public parseRawData(item: any) {
     if(!item) {
         return item;
     }
     if(item.rawData &&  !item.rawDataParsed) {
         item.rawDataParsed = true;
         const pageProps = item.rawData.props.pageProps;
         //const collegeData = pageProps.collegeData;
         const pageData = pageProps.pageData;
         //const about = collegeData.about;
         item.currencyCode = pageData.currencyCode;
 
         item.careerPathData = pageProps.careerPathData;
         item.narratives = pageData.narratives;
         const compensation = pageData.compensation;
         item.compensation = {
             salary: {
                 profileCount: compensation.salary ? compensation.salary.profileCount : 0,
                 min: compensation.salary ? (compensation.salary['10'] ? compensation.salary['10'] : compensation.salary['25']) : 0,
                 max: compensation.salary ? (compensation.salary['90'] ? compensation.salary['90'] : compensation.salary['75']) : 0,
                 avg: compensation.salary ? compensation.salary['50'] : 0
             },
             hourlyRate: {
                 profileCount: compensation.hourlyRate ? compensation.hourlyRate.profileCount : 0,
                 min: compensation.hourlyRate ? (compensation.hourlyRate['10'] ? compensation.hourlyRate['10'] : compensation.hourlyRate['25']) : 0,
                 max: compensation.hourlyRate ? (compensation.hourlyRate['90'] ? compensation.hourlyRate['90'] : compensation.hourlyRate['75']) : 0,
                 avg: compensation.hourlyRate ? compensation.hourlyRate['50'] : 0                    
             },
             bonus: {
                 profileCount: compensation.bonus ? compensation.bonus.profileCount : 0,
                 min: compensation.bonus ? (compensation.bonus['10'] ? compensation.bonus['10'] : compensation.bonus['25']) : 0,
                 max: compensation.bonus ? (compensation.bonus['90'] ? compensation.bonus['90'] : compensation.bonus['75']) : 0,
                 avg: compensation.bonus ? compensation.bonus['50'] : 0                    
             },
             commission: {
                 profileCount: compensation.commission ? compensation.commission.profileCount : 0,
                 min: compensation.commission ? (compensation.commission['10'] ? compensation.commission['10'] : compensation.commission['25']) : 0,
                 max: compensation.commission ? (compensation.commission['90'] ? compensation.commission['90'] : compensation.commission['75']) : 0,
                 avg: compensation.commission ? compensation.commission['50'] : 0                    
             },
             profitSharing: {
                 profileCount: compensation.profitSharing ? compensation.profitSharing.profileCount : 0,
                 min: compensation.profitSharing ? (compensation.profitSharing['10'] ? compensation.profitSharing['10'] : compensation.profitSharing['25']) : 0,
                 max: compensation.profitSharing ? (compensation.profitSharing['90'] ? compensation.profitSharing['90'] : compensation.profitSharing['75']) : 0,
                 avg: compensation.profitSharing ? compensation.profitSharing['50'] : 0                    
             },
             total: {
                 profileCount: compensation.total ? compensation.total.profileCount : 0,
                 min: compensation.total ? (compensation.total['10'] ? compensation.total['10'] : compensation.total['25']) : 0,
                 max: compensation.total ? (compensation.total['90'] ? compensation.total['90'] : compensation.total['75']) : 0,
                 avg: compensation.total ? compensation.total['50'] : 0                    
             }
         }
 
 
 
         item.byDimension = {
             experience: {
                 entryLevel: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 },
                 earlyCareer: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 },
                 midCareer: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 },
                 lateCareer: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 },
                 experienced: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 }
             },
             gender: {
                 male: {
                   profileCount: 0,
                   min: 0,
                   max: 0,
                   avg: 0
                 },
                 female: {
                   profileCount: 0,
                   min: 0,
                   max: 0,
                   avg: 0
                 },
                 selfDefine: {
                     profileCount: 0,
                     min: 0,
                     max: 0,
                     avg: 0
                 } 
             },
             healthBenefit: {
                 medical: {
                     profileCount: 0
                 },
                 dental: {
                     profileCount: 0
                 },
                 vision: {
                     profileCount: 0
                 },
                 none: {
                     profileCount: 0
                 }
             }
         };                
         const byDimension = pageData.byDimension;
         //console.log('byDimension==', byDimension);

         if(byDimension) {
             if(byDimension['Gender Breakdown']) {
                 const byGenderItems = byDimension['Gender Breakdown']['rows'];
                 if(byGenderItems && byGenderItems.length > 0) {
                     for(let i = 0; i < byGenderItems.length;i++) {
                         const byGenderItem = byGenderItems[i];
                         if(byGenderItem.name == 'Male') {
                             item.byDimension.gender.male.profileCount = byGenderItem.profileCount;
                             if(byGenderItem.range) {
                                 item.byDimension.gender.male.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                 item.byDimension.gender.male.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                 item.byDimension.gender.male.avg = byGenderItem.range['50'];
                             }
         
                         } else 
                         if(byGenderItem.name == 'Female') {
                             item.byDimension.gender.female.profileCount = byGenderItem.profileCount;
                             if(byGenderItem.range) {
                                 item.byDimension.gender.female.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                 item.byDimension.gender.female.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                 item.byDimension.gender.female.avg = byGenderItem.range['50'];
                             }
         
                         } else
                         if(byGenderItem.name == 'Prefer to self-define') {
                             item.byDimension.gender.selfDefine.profileCount = byGenderItem.profileCount;
                             if(byGenderItem.range) {
                                 item.byDimension.gender.selfDefine.min = byGenderItem.range['10'] ? byGenderItem.range['10'] : byGenderItem.range['25'];
                                 item.byDimension.gender.selfDefine.max = byGenderItem.range['90'] ? byGenderItem.range['90'] : byGenderItem.range['75'];
                                 item.byDimension.gender.selfDefine.avg = byGenderItem.range['50'];
                             }
                         }
                     }
                 }
             }
 
             if(byDimension['Job by Experience']) {
                 const byExperienceItems = byDimension['Job by Experience']['rows'];
                 if(byExperienceItems && byExperienceItems.length > 0) {
                     for(let i = 0; i < byExperienceItems.length;i++) {
                         const byExperienceItem = byExperienceItems[i];
                         if(byExperienceItem.name == '10-19 years') {
                             item.byDimension.experience.lateCareer.profileCount = byExperienceItem.profileCount;
                             if(byExperienceItem.range) {
                                 item.byDimension.experience.lateCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                 item.byDimension.experience.lateCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                 item.byDimension.experience.lateCareer.avg = byExperienceItem.range['50'];
                             }
                         } else 
                         if(byExperienceItem.name == '20 years or more') {
                             item.byDimension.experience.experienced.profileCount = byExperienceItem.profileCount;
                             if(byExperienceItem.range) {
                                 item.byDimension.experience.experienced.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                 item.byDimension.experience.experienced.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                 item.byDimension.experience.experienced.avg = byExperienceItem.range['50'];
                             }
                         } else 
                         if(byExperienceItem.name == '1-4 years') {
                             item.byDimension.experience.earlyCareer.profileCount = byExperienceItem.profileCount;
                             if(byExperienceItem.range) {
                                 item.byDimension.experience.earlyCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                 item.byDimension.experience.earlyCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                 item.byDimension.experience.earlyCareer.avg = byExperienceItem.range['50'];
                             }
                         } else 
                         if(byExperienceItem.name == '5-9 years') {
                             item.byDimension.experience.midCareer.profileCount = byExperienceItem.profileCount;
                             if(byExperienceItem.range) {
                                 item.byDimension.experience.midCareer.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                 item.byDimension.experience.midCareer.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                 item.byDimension.experience.midCareer.avg = byExperienceItem.range['50'];
                             }
                         } else {
                             item.byDimension.experience.entryLevel.profileCount = byExperienceItem.profileCount;
                             if(byExperienceItem.range) {
                                 item.byDimension.experience.entryLevel.min = byExperienceItem.range['10'] ? byExperienceItem.range['10'] : byExperienceItem.range['25'];
                                 item.byDimension.experience.entryLevel.max = byExperienceItem.range['90'] ? byExperienceItem.range['90'] : byExperienceItem.range['75'];
                                 item.byDimension.experience.entryLevel.avg = byExperienceItem.range['50'];    
                             }                        
                         }
                     } 
                 }
             }
 
     
             if(byDimension['Health Insurance Overall']) {
                 const byHealthBenefitItems = byDimension['Health Insurance Overall']['rows'];
                 if(byHealthBenefitItems && byHealthBenefitItems.length > 0) {
                     for(let i = 0; i < byHealthBenefitItems.length;i++) {
                         const byHealthBenefitItem = byHealthBenefitItems[i];
                         if(byHealthBenefitItem.name == 'Medical / Health') {
                             item.byDimension.healthBenefit.medical.profileCount = byHealthBenefitItem.profileCount;
                         } else 
                         if(byHealthBenefitItem.name == 'None') {
                             item.byDimension.healthBenefit.none.profileCount = byHealthBenefitItem.profileCount;
                         } else
                         if(byHealthBenefitItem.name == 'Dental') {
                             item.byDimension.healthBenefit.dental.profileCount = byHealthBenefitItem.profileCount;
                         } else
                         if(byHealthBenefitItem.name == 'Vision') {
                             item.byDimension.healthBenefit.vision.profileCount = byHealthBenefitItem.profileCount;
                         }
                     }
                 }
             }
         }


         if(pageData.ratings) {
             item.ratings = {
                 overall: pageData.ratings['Job Satisfaction Overall']
             };
         }

        };
        return item;
 }

   public async fetchAllNotParsed(): Promise<Job[]> {
     return await JobModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).select('name slug rawDataParsed rawData').limit(10);
   }

   public async fetchByName(countryName: string, name: string): Promise<Job[]> {
     const translates = await TranslateModel.find({$and: [{type: 'Country'}, {$or: [{en: { "$regex": countryName, "$options": "i" }}, {zh: { "$regex": countryName, "$options": "i" }}]}]});
     if(translates && translates.length > 0) {
          const namets = translates.map(item => item._id);
          const countries = await CountryModel.find({namet: {$in:namets}});
          const countryIds = countries.map(item => item._id);

          const categories = await CategoryModel.find({country: {$in: countryIds}, type: 'Job'});
          const categoryIds = categories.map(item => item._id);
          const translateJobs = await TranslateModel.find({$and: [{type: 'Job'}, {$or: [{en: { "$regex": name, "$options": "i" }}, {zh: { "$regex": name, "$options": "i" }}]}]});
          if(translateJobs && translateJobs.length > 0) {
               const nametJobs = translateJobs.map(item => item._id);
               return await JobModel.find({namet: {$in:nametJobs}, category: {$in: categoryIds}}).populate('namet').select('name namet').sort('name');
          }
     }
     return [];
    }

   public async fetchCountNotParsed() : Promise<number> {
     return await JobModel.find({$and: [{duplicatedWith: null}, {$or: [{rawDataParsed: false}, {rawDataParsed: undefined}]} ]}).count();
   } 

   public async fetchCount(): Promise<number> {
     return await JobModel.find({duplicatedWith: null}).count();
   }

   public async fetchJobs(pageNum: number, pageSize: number): Promise<Job[]> {
          return await JobModel.find({duplicatedWith: null}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).sort('name namet url').populate('namet').sort('name namet url');
   }


   public async fetchDistinct(): Promise<Job[]> {
        return await JobModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await JobModel.updateMany(query, data);
   }

   public async fetchAllWithoutDuplicate(): Promise<Job[]> {
     return await JobModel.find({duplicatedWith: null}).populate('namet').select('name namet url category');
   }

   public async fetchAllByName(name: string): Promise<Job[]> {
     return await JobModel.find({name}).select('_id');
   }

   public async fetchOneByName(name: string): Promise<Job | null> {
     return await JobModel.findOne({name});
   }

   public async fetchByUrl(url: string) : Promise<Job | null> {
     let anotherUrl = '';
     if(url.indexOf('/Salary') > 0) {
          url = url.substring(0, url.indexOf('/Salary')) + '/Salary';
          anotherUrl = url.replace('/Salary', '/Hourly_Rate');
     } else {
          url = url.substring(0, url.indexOf('/Hourly_Rate')) + '/Hourly_Rate';
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
     const jobs = await JobModel.find({$and: [{duplicatedWith: null},{$or: [{slug: slug}, {name: slug}]}]}).populate(
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