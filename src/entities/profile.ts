import { User } from "@entities";

export class Profile {
    public id!: string;
    public email!: string;
    public userName!: string;
    public displayName!: string;
    public friendsCount!: number;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.userName = user.userName;
        this.displayName = user.displayName;
        this.friendsCount = 0; //TODO: implement friendsCount
    }


}
