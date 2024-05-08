import { Op } from 'sequelize';
import { UserModel } from './userModel';
import { User } from '@entities';


class UserRepository {

    public async search(query: string): Promise<User[]> {
        const users = await UserModel.findAll({
            where: {
                [Op.or]: [
                    { userName: { [Op.iLike]: `%${query}%` } },
                    { displayName: { [Op.iLike]: `%${query}%` } },
                    { email: { [Op.iLike]: `%${query}%` } },
                ],
            },
        });
        return users.map((user) => new User({ ...user.toJSON() }));
    }

    public async save(user: User): Promise<User> {
        return (await UserModel.create({ ...user })).toJSON();
    }

    public async update(id: number, fields: Partial<User>): Promise<User> {
        const user = await UserModel.findOne({ where: { id } });
        if (!user) return null;
        await user.update(fields);
        return new User({
            ...user.toJSON(),
        });
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

    public async findManyByIds(ids: number[]): Promise<User[]> {
        const users = await UserModel.findAll({ where: { id: ids } });
        return users.map((user) => new User({ ...user.toJSON() }));
    }
}

export const userRepository = new UserRepository();
