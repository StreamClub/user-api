import { FriendRequest } from "@entities";
import { FriendRequestModel } from "./friendRequestModel";

class FriendRequestRepository {

    //TODO: CATCH FK EXCEPTION
    //TODO: FIX CASE WHEN FRIEND REQUEST ALREADY EXISTS
    public async save(senderId: number, receiverId: number): Promise<FriendRequest> {
        const friendRequest = await FriendRequestModel.create({ senderId, receiverId });
        return new FriendRequest(friendRequest);
    }
}

export const friendRequestRepository = new FriendRequestRepository();
