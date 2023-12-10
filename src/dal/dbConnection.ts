import { initTokenModel, initUserModel, initVerificationCodeModel } from "@dal";
import { Sequelize } from "sequelize";


export class Db {
    protected dbConnection: Sequelize;
    public constructor(database: string, logging: boolean) {
        this.dbConnection = new Sequelize(database, { logging });
        this.dbConnection
            .authenticate()
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        initTokenModel(this.dbConnection);
        initUserModel(this.dbConnection);
        initVerificationCodeModel(this.dbConnection);
    }
}
