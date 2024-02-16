import { UserModel } from './userModel';
import { User } from '@entities';


class UserRepository {
    public async save(user: User): Promise<User> {
        return (await UserModel.create({ ...user })).toJSON();
    }

    public async update(id: number, fields: Partial<User>): Promise<User> {
        await UserModel.update(fields, { where: { id } });
        return
    }

    public async findOneByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        if (!user) return null;
        return new User({
            ...user.toJSON(),
        });
    }

    public async findOneById(id: number): Promise<User | null> {
        const user = await UserModel.findOne({ where: { id } });
        if (!user) return null;
        return new User({
            ...user.toJSON(),
        });
    }
}

export const userRepository = new UserRepository();
