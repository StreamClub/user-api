import { config } from "@config";
import { Sequelize } from "sequelize";
import { initTokenModel } from "./tokens";
import { initUserModel } from "./users";
import { initVerificationCodeModel } from "./verificationCodes";

class Db {
    private dbConnection = new Sequelize(config.dbUrl);

    public init() {
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


export { Db };
