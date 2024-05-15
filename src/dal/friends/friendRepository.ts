import { Friend } from "@entities";
import { FriendModel } from "./friendModel";
import { NotFoundException } from "@exceptions";
import { Op } from "sequelize";

class FriendRepository {

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
}

export const friendRepository = new FriendRepository();
