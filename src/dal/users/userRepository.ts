import cloneDeep from 'clone-deep';
import { UserModel } from './userModel';
import { User } from '@entities';


class UserRepository {
    public async save(user: User) {
        await UserModel.create({ ...user });
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return null;
        return new User({
            ...user.toJSON(),
        });
    }
}

export const userRepository = new UserRepository();
