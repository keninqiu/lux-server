import { CategoryModel, Category, ICategory } from '../models/categorySchema';
export class CategoryDao {
   public async fetchAll(): Promise<Category[]> {
        return await CategoryModel.find({});
   }

   public async fetchAllByType(type: string): Promise<Category[]> {
    return await CategoryModel.find({type});
   }

   public async fetchAllByTypePopulate(type: string): Promise<any[]> {
    return await CategoryModel.find({type}).populate('country');
   }

   public async fetchById(id: string): Promise<Category | null> {
        return await CategoryModel.findById(id);
   }

   public async create(data: ICategory): Promise<Category | null> {
       return await CategoryModel.findOneAndUpdate({name: data.name, country: data.country}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<Category | null> {
        return await CategoryModel.updateOne({_id: id}, data);
   }   
  
   public async delete(id: string): Promise<Category | null> {
        return await CategoryModel.findByIdAndDelete(id);
   } 

   public async deleteMany(ids: string[]): Promise<any> {
        return await CategoryModel.deleteMany({_id: {$in: ids}});
   }   
   
   public async deleteAll(): Promise<any> {
        return await CategoryModel.deleteMany({});
   }  
   public async deleteAllByType(type: string): Promise<any> {
    return await CategoryModel.deleteMany({type});
   }  
}