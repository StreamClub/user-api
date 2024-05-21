import { FriendRequestActions } from "@config";
import { friendRequestRepository, friendRepository } from "@dal";
import { FriendRequest, Page } from "@entities";
import { DomainException, NotFoundException } from "@exceptions";

class FriendService {

    public async getFriendList(userId: number, pageNumber: number, pageSize: number): Promise<Page> {
        return await friendRepository.findFriendList(userId, pageNumber, pageSize);
    }

    public async deleteFriend(userId: number, friendId: number): Promise<void> {
        const friend = await friendRepository.findOneWith(userId, friendId);
        if (!friend) {
            throw new NotFoundException('El usuario no es tu amigo');
        }
        await friendRepository.delete(friend.id);
    }

    public async sendFriendRequest(senderId: number, receiverId: number): Promise<FriendRequest> {
        const friend = await friendRepository.findOneWith(senderId, receiverId);
        if (friend) {
            throw new DomainException('Los usuarios ya son amigos');
        }
        const friendRequest = await friendRequestRepository.findOneWith(senderId, receiverId);
        if (friendRequest) {
            return friendRequest;
        } else {
            return await friendRequestRepository.save(senderId, receiverId);
        }
    }

    public async getFriendRequest(userId: number, pageNumber: number, pageSize: number): Promise<Page> {
        return await friendRequestRepository.findRequestTo(userId, pageNumber, pageSize);
    }

    public async deleteFriendRequest(userId: number, friendRequestId: number, action: string): Promise<void> {
        const friendRequest = await friendRequestRepository.findOne(friendRequestId);
        if (!friendRequest || (friendRequest.senderId !== userId && friendRequest.receiverId !== userId)) {
            throw new NotFoundException('La solicitud de amistad no existe');
        }
        if (action === FriendRequestActions.ACCEPT) {
            await this.acceptFriendRequest(userId, friendRequest);
        }
        await friendRequestRepository.delete(friendRequestId);
    }

    private async acceptFriendRequest(userId: number, friendRequest: FriendRequest): Promise<void> {
        if (friendRequest.receiverId !== userId) {
            throw new DomainException('No puedes aceptar esta solicitud de amistad');
        }
        await friendRepository.save(friendRequest.senderId, friendRequest.receiverId);
    }

}

export const friendService = new FriendService();