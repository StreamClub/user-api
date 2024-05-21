import { Friend, Page } from "@entities";
import { FriendModel } from "./friendModel";
import { NotFoundException } from "@exceptions";
import { Op } from "sequelize";

class FriendRepository {

    public async findFriendList(userId: number, pageNumber: number, pageSize: number): Promise<Page> {
        const { rows, count } = await FriendModel.findAndCountAll({
            where: {
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            },
            offset: (pageNumber - 1) * pageSize,
            limit: pageSize,
        });

        const friends = rows.map((friend) => new Friend(friend));
        return new Page(pageNumber, pageSize, count, friends);
    }

    public async save(userId1: number, userId2: number): Promise<Friend> {
        try {
            const created = await FriendModel.create({ userId1, userId2 });
            return new Friend(created);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new NotFoundException('El usuario no existe');
            }
        }
    }

    public async findOneWith(userId1: number, userId2: number): Promise<Friend | null> {
        const friend = await FriendModel.findOne({
            where: {
                [Op.or]: [
                    { userId1: userId1, userId2: userId2 },
                    { userId1: userId2, userId2: userId1 }
                ]
            }
        });
        if (!friend) return null;
        return new Friend(friend);
    }

    public async countFriendsOf(userId: number): Promise<number> {
        return await FriendModel.count({
            where: {
                [Op.or]: [
                    { userId1: userId },
                    { userId2: userId }
                ]
            }
        });
    }

    public async delete(friendId: number): Promise<void> {
        await FriendModel.destroy({ where: { id: friendId } });
    }
}

export const friendRepository = new FriendRepository();
