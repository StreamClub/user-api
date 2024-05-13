import { FriendRequest } from "@entities";
import { FriendRequestModel } from "./friendRequestModel";
import { Op } from "sequelize";
import { NotFoundException } from "@exceptions";

class FriendRequestRepository {

    public async save(senderId: number, receiverId: number): Promise<FriendRequest> {
        try {
            const created = await FriendRequestModel.create({ senderId, receiverId });
            return new FriendRequest(created);
        } catch (error) {
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new NotFoundException('El usuario no existe');
            }
        }
    }

    public async findOne(userId1: number, userId2: number): Promise<FriendRequest | null> {
        const friendRequest = await FriendRequestModel.findOne({
            where: {
                [Op.or]: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            }
        });
        if (!friendRequest) return null;
        return new FriendRequest(friendRequest);
    }
}

export const friendRequestRepository = new FriendRequestRepository();
