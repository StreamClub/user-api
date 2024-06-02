import {
    initFriendModel, initFriendRequestModel, initLevelModel, initPointModel, initTokenModel,
    initUserModel, initVerificationCodeModel,
    levelRepository
} from "@dal";
import { logger } from "@utils";
import { Sequelize } from "sequelize";


export class Db {
    protected dbConnection: Sequelize;
    public constructor(database: string, logging: boolean) {
        this.dbConnection = new Sequelize(database, { logging });
        this.dbConnection
            .authenticate()
            .then(async () => {
                initTokenModel(this.dbConnection);
                initUserModel(this.dbConnection);
                initFriendRequestModel(this.dbConnection);
                initVerificationCodeModel(this.dbConnection);
                initFriendModel(this.dbConnection);
                initPointModel(this.dbConnection);
                initLevelModel(this.dbConnection);
                await this.dbConnection.sync();
                await levelRepository.initLevels();
            })
            .catch(err => {
                logger.error(`Unable to connect to the database: ${err.message}`);
            });
    }
}
