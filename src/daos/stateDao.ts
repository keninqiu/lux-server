import { StateModel, State, IState } from '../models/stateSchema';
export class StateDao {
   public async fetchAll(): Promise<State[]> {
        return await StateModel.find({}).populate('namet').select('name namet country url').sort('name');
   }

   public async fetchCount(): Promise<number> {
     return await StateModel.find({}).count();
   }

   public async fetchStates(pageNum: number, pageSize: number): Promise<State[]> {
          return await StateModel.find({}).limit(pageSize)
          .skip((pageNum - 1) * pageSize).populate('namet').populate('country').sort('name namet url country');
   }

   public async fetchDistinct(): Promise<State[]> {
     return await StateModel.distinct('name');
   }

   public async updateManyByQuery(query: any, data: any): Promise<any> {
     return await StateModel.updateMany(query, data);
   }

   public async fetchAllByName(name: string): Promise<State[]> {
     return await StateModel.find({name}).select('_id');
   }

   public async fetchAllByCountry(id: string): Promise<State[]> {
        return await StateModel.find({country: id}).select('name country url').sort('name');
   }

   public async fetchAllPopulate(): Promise<any[]> {
        return await StateModel.find({}).populate('country');
   }

   public async fetchById(id: string): Promise<State | null> {
        return await StateModel.findById(id);
   }

   public async create(data: IState): Promise<State | null> {
        return await StateModel.findOneAndUpdate({name: data.name, country: data.country}, data, {upsert: true, new: true});
   }

   public async update(id: string, data: any): Promise<State | null> {
        return await StateModel.findOneAndUpdate({_id: id}, data, {new: true});
   }   
  
   public async delete(id: string): Promise<State | null> {
        return await StateModel.findByIdAndDelete(id);
   } 

   public async deleteAll(): Promise<any> {
        return await StateModel.deleteMany({});
   }
   
   public async deleteMany(ids: string[]): Promise<any> {
        return await StateModel.deleteMany({_id: {$in: ids}});
   }     
}