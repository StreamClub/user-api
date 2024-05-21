export class Friend {
    id!: number;
    userId1: number;
    userId2: number;

    constructor(data: Partial<Friend>) {
        this.id = data.id;
        this.userId1 = data.userId1;
        this.userId2 = data.userId2;
    }
}
