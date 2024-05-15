import { FriendRequestActions } from "@config";
import { userRepository, friendRequestRepository, friendRepository } from "@dal";
import { FriendRequest, Page, Profile, User } from "@entities";
import { DomainException, NotFoundException } from "@exceptions";

class UserService {

    public async searchUser(query: string): Promise<any> {
        const users = await userRepository.search(query);
        const results = await Promise.all(users.map(async (user) => {
            return await this.profileOf(user);
        }));
        return { results };
    }

    public async findByEmail(email: string): Promise<User> {
        return await userRepository.findOneByEmail(email);
    }

    public async findById(id: number): Promise<Profile> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            return null;
        }
        return await this.profileOf(user);
    }

    private async profileOf(user: User): Promise<Profile> {
        const profile = new Profile(user);
        profile.friendsCount = await friendRepository.countFriendsOf(Number(user.id));
        return profile;
    }

    public async update(userId: number, newUserData: Partial<User>): Promise<Profile> {
        const user = await userRepository.update(userId, newUserData);
        if (!user) {
            throw new NotFoundException('El usuario no existe');
        }
        delete user.password;
        return new Profile(user);
    }

    public async getUserNames(userIds: number[]): Promise<any> {
        const users = await userRepository.findManyByIds(userIds);
        return users.map((user) => {
            return {
                id: user.id,
                userName: user.userName,
            };
        });
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

export const userService = new UserService();