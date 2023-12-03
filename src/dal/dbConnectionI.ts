import { initTokenModel, initUserModel, initVerificationCodeModel } from "@dal";
import { Sequelize } from "sequelize";


export abstract class DbI {
    protected dbConnection: Sequelize;
    public constructor(database: string) {
        this.dbConnection = new Sequelize(database);
        this.dbConnection
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        initTokenModel(this.dbConnection);
        initUserModel(this.dbConnection);
        initVerificationCodeModel(this.dbConnection);
    }
}
