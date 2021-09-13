import { UserModel, User, IUser } from '../models/userSchema';
var md5 = require('md5');

export class UserDao {
    public async fetchById(id: string): Promise<User | null> {
        return await UserModel.findById(id).select('-password');
    }

    public async create(data: IUser): Promise<User | null> {
        const newUser = {
            ...data,
            password: md5(data.password)
        }
        const user = await UserModel.create(newUser);
        return user;
    }  
    
    public async update(id: string, data: any): Promise<User | null> {
        return await UserModel.findOneAndUpdate({_id: id}, data, {new: true});
    }    
    
    public async fetchAllByStoreIds(storeIds: string[]): Promise<User[] | null> {
        const storeIdField: any = [];
        storeIds.forEach(item => {
            storeIdField.push({'store': item});
        });
        const query = {
            $or: storeIdField
        };
        return await UserModel.find(query).populate('store');
    } 
}