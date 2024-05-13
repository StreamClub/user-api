import { FriendRequest } from "@entities";
import { FriendRequestModel } from "./friendRequestModel";

class FriendRequestRepository {

    public async save(senderId: number, receiverId: number): Promise<FriendRequest> {
        const friendRequest = await FriendRequestModel.create({ senderId, receiverId });
        return new FriendRequest(friendRequest);
    }
}

export const friendRequestRepository = new FriendRequestRepository();
