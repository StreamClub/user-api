

export class Group {
    public id!: number;
    public name!: string;
    public members!: number[];

    constructor(data: Partial<Group>) {
        this.id = data.id!;
        this.name = data.name!;
        this.members = data.members!;
    }
}