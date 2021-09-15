import { StateModel, State, IState } from '../models/stateSchema';
export class StateDao {
   public async fetchAll(): Promise<State[]> {
        return await StateModel.find({}).select('name country url').sort('name');
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