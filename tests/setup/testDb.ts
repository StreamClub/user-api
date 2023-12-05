import { Db } from "../../src/dal/dbConnection";
export class TestDb extends Db {

    public constructor() {
        super('sqlite::memory:', false);
    }

    public async initTestDb(): Promise<void> {
        await this.dbConnection.sync({ force: true });
    }

    public async clearDatabase(): Promise<void> {
        await this.dbConnection.drop();
    }

    public async closeDatabase(): Promise<void> {
        await this.dbConnection.close();
    }

}
