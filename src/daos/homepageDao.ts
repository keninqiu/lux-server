import { HomepageModel, Homepage, IHomepage } from '../models/homepageSchema';
export class HomepageDao {
   public async fetchLatest(): Promise<Homepage | null> {
        const items = await HomepageModel.find({});
        if(!items || items.length ==0) {
            return null;
        }
        return items[items.length - 1];
   }

   public async create(data: any): Promise<Homepage | null> {
        return await HomepageModel.create(data);
   }

   public async update(id: string, data: any): Promise<Homepage | null> {
        return await HomepageModel.findOneAndUpdate({_id: id}, data, {new: true});
   }  
   public async updateByQuery(query: any, data: any): Promise<Homepage | null> {
    return await HomepageModel.update(query, data);
}  
}