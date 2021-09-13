import { SkillModel, Skill, ISkill } from '../models/skillSchema';
export class SkillDao {
   public async fetchAll(): Promise<Skill[]> {
        return await SkillModel.find({});
   }
   public async fetchById(id: string): Promise<Skill | null> {
        return await SkillModel.findById(id);
   }

   public async create(data: ISkill): Promise<Skill | null> {
       return await SkillModel.findOneAndUpdate({name: data.name, category: data.category}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Skill | null> {
        return await SkillModel.updateOne({_id: id}, data);
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