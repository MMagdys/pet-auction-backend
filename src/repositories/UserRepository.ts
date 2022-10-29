import { IUserDocument, IUserProps } from '@pbb/models/user/IUser';
import User from '@pbb/models/user/User';
import { injectable } from 'inversify';

import Repository, { IRepository } from './Repository';


export interface IUserRepository extends IRepository<IUserDocument> { }

@injectable()
export default class UserRepository
    extends Repository<IUserDocument> {

    constructor() {
        super(User);
    }

    public async registerByEmail(userProps: IUserProps, password: string): Promise<IUserDocument | null> {
        const user = new User(userProps);
        await user.setPassword(password);
        return this.saveInstance(user);
    }

}
