import { User } from "./user";

export class Friendship {
    id: number;
    email: string;
    userName: string;
    displayName: string;
    userId: string;
    photoId: number;

    constructor(friendshipId: number, user: User) {
        this.id = friendshipId;
        this.email = user.email;
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.userId = user.id;
        this.photoId = user.photoId
    }
}
