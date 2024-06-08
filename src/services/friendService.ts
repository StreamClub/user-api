import { FriendRequestActions } from "@config";
import { friendRequestRepository, friendRepository, userRepository } from "@dal";
import { Friend, FriendRequest, FriendRequestInfo, Friendship, Page, Profile } from "@entities";
import { DomainException, NotFoundException } from "@exceptions";

class FriendService {


    public async getFriendship(userId1: number, userId2: number): Promise<Friend> {
        return await friendRepository.findOneWith(userId1, userId2);
    }

    public async getFriendList(userId: number, pageNumber: number, pageSize: number): Promise<Page> {
        const friendships = await friendRepository.findFriendList(userId, pageNumber, pageSize);
        const friendsIds: number[] = friendships.results.map(friend =>
            friend.userId1 == userId ? friend.userId2 : friend.userId1);
        const friends = await userRepository.findManyByIds(friendsIds);
        const result = friendships.results.map(friendship => {
            const friend = friends.find(f => f.id === (friendship.userId1 == userId ? friendship.userId2 : friendship.userId1));
            return new Friendship(friendship.id, friend);
        })
        friendships.setResults(result);
        return friendships;
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

    public async getFriendRequest(userId1: number, userId2: number): Promise<FriendRequest> {
        return await friendRequestRepository.findOneWith(userId1, userId2);
    }

    public async getRequestTo(userId: number, pageNumber: number, pageSize: number): Promise<Page> {
        const friendRequests = await friendRequestRepository.findRequestTo(userId, pageNumber, pageSize);
        const requestersIds: number[] = friendRequests.results.map(request => request.senderId);
        const senders = await userRepository.findManyByIds(requestersIds);
        const result = friendRequests.results.map(request => {
            const sender = senders.find(f => f.id === request.senderId);
            return new FriendRequestInfo(request.id, sender);
        })
        friendRequests.setResults(result);
        return friendRequests;
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