export class UserLevel {
    public name!: string;
    public points!: number;
    public nextLevelThreshold!: number;
    public levelNumber: number;

    constructor(data: Partial<UserLevel>) {
        Object.assign(this, data);
    }

    public setNextLevelThreshold(pointsToNextLevel: number): void {
        this.nextLevelThreshold = pointsToNextLevel;
    }
}