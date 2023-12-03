import { DbI } from "../../src/dal/dbConnectionI";

export class TestDb extends DbI {
    public constructor() {
        super('sqlite::memory:');
    }
}
