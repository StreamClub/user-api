export class FriendRequest {
    id!: number;
    senderId: number;
    receiverId: number;

    constructor(data: Partial<FriendRequest>) {
        this.id = data.id;
        this.senderId = data.senderId;
        this.receiverId = data.receiverId;
    }
}
