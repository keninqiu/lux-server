import { UserModel, User, ILoginModel, IRegisterModel } from '../models/userSchema';
var md5 = require('md5');

export class AuthDao {

    public async register(data: IRegisterModel): Promise<User | null> {
        const newUser = {
            ...data,
            password: md5(data.password)
        }
        const user = await UserModel.create(newUser);
        return user;
    }

    public async login(data: ILoginModel): Promise<User | null> {
        const query = {
            password: md5(data.password),
            email: data.email,
            store: data.store
        }
        const user = await UserModel.findOne(query);
        
        return user;
    }    
}