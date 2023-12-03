import { config } from "@config";
import { DbI } from "./dbConnectionI";

export class Db extends DbI {
    public constructor() {
        super(config.dbUrl);
    }
}
