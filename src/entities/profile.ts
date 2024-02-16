import { User } from "@entities";

export class Profile {
    public id!: string;
    public email!: string;
    public userName!: string;
    public displayName!: string;
    public friendsCount!: number;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
        this.friendsCount = 0; //TODO: implement friendsCount
    }


}
