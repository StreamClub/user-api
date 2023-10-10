export class User {

    public email!: string;
    public userName!: string;
    public displayName!: string;
    public password!: string;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }


}
