import { Friend } from "@entities";
import { FriendModel } from "./friendModel";
import { NotFoundException } from "@exceptions";

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
}

export const friendRepository = new FriendRepository();
