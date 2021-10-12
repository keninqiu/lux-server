import { TranslateModel, Translate, ITranslate } from '../models/translateSchema';
export class TranslateDao {
   public async fetchAll(): Promise<Translate[]> {
        return await TranslateModel.find({});
   }

   public async fetchCount(): Promise<number> {
    return await TranslateModel.find({}).count();
  }

  public async fetchTranslates(pageNum: number, pageSize: number): Promise<Translate[]> {
         return await TranslateModel.find({}).limit(pageSize)
         .skip((pageNum - 1) * pageSize);
  }

  public async fetchCountByType(type: string): Promise<number> {
    return await TranslateModel.find({type}).count();
  }

  public async fetchTranslatesByType(type: string, pageNum: number, pageSize: number): Promise<Translate[]> {
         return await TranslateModel.find({type}).limit(pageSize)
         .skip((pageNum - 1) * pageSize);
  }

  public async fetchAllUntranslatedByType(type: string): Promise<Translate[]> {
    return await TranslateModel.find(
      {
        '$and': [
          { type: type },
          { '$or': [
            {zh: { $exists: false }}, 
            {zh: ''}
          ]}
        ]
      });
  }

   public async fetchAllUnTranslated(): Promise<Translate[]> {
    return await TranslateModel.find(          
      { '$or': [
      {zh: { $exists: false }}, 
      {zh: ''}
    ]});
  }
   public async fetchAllByType(type: string): Promise<Translate[]> {
     return await TranslateModel.find({type});
   }
   public async fetchById(id: string): Promise<Translate | null> {
        return await TranslateModel.findById(id);
   }

   public async fetchByEn(en:string): Promise<Translate | null> {
     return await TranslateModel.findOne({en});
   }

   public async create(data: any): Promise<Translate | null> {
       return await TranslateModel.findOneAndUpdate({en: data.en}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Translate | null> {
        return await TranslateModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<Translate | null> {
        return await TranslateModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await TranslateModel.deleteMany({_id: {$in: ids}});
   }     

   public async deleteAll(): Promise<any> {
     return await TranslateModel.deleteMany({});
   }    

   public async deleteAllByType(type: string): Promise<any> {
     //return await TranslateModel.deleteMany({type});
   }    

   public async insertMany(translates: any): Promise<any> {
     return await TranslateModel.insertMany(translates);
   }    
}