export class Friend {
    id!: number;
    senderId: number;
    receiverId: number;

    constructor(data: Partial<Friend>) {
        this.id = data.id;
        this.senderId = data.senderId;
        this.receiverId = data.receiverId;
    }
}
