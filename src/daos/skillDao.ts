import { SkillModel, Skill, ISkill } from '../models/skillSchema';
export class SkillDao {
   public async fetchAll(): Promise<Skill[]> {
        return await SkillModel.find({}).select('name url category');
   }
   public async fetchAllWithoutRawData(): Promise<Skill[]> {
     return await SkillModel.find({rawData: null}).select('name url category');
   }
   public async fetchById(id: string): Promise<Skill | null> {
        return await SkillModel.findById(id);
   }

   public async create(data: ISkill): Promise<Skill | null> {
       return await SkillModel.findOneAndUpdate({name: data.name, category: data.category, url: data.url}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Skill | null> {
        return await SkillModel.findOneAndUpdate({_id: id}, data, {new: true});
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