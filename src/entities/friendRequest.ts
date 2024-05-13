export class FriendRequest {
    senderId: number;
    receiverId: number;

    constructor(data: Partial<FriendRequest>) {
        Object.assign(this, data);
    }
}
