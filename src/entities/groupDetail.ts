import { Group } from "./group";
import { User } from "./user";

export class GroupDetail {
    public id!: number;
    public name!: string;
    public members!: User[];

    constructor(group: Group, users: User[]) {
        this.id = group.id;
        this.name = group.name;
        this.members = users;
    }
}