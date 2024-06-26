import { Friend, FriendRequest, User, UserLevel } from "@entities";

export class Profile {
    public id!: string;
    public email!: string;
    public userName!: string;
    public displayName!: string;
    public friendsCount!: number;
    public level!: UserLevel;
    public friendRequest: FriendRequest | null = null;
    public friendship: Friend | null = null;
    public photoId: number;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.photoId = user.photoId;
    }

    public setLevel(userLevel: UserLevel): void {
        this.level = userLevel;
    }

    public setFriendStatus(friendRequest: FriendRequest, friendship: Friend): void {
        this.friendRequest = friendRequest;
        this.friendship = friendship;
    }
}
