export class User {
    public id!: string;
    public email!: string;
    public userName!: string;
    public displayName!: string;
    public password!: string;
    public photoId!: number;

    constructor(data: Partial<User>) {
        Object.assign(this, data);
    }
}
