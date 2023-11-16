import { DataTypes, Model, Sequelize } from "sequelize";


class TokenModel extends Model {
    declare email: string;
    declare refreshToken: string;
}

export function initTokenModel(dbConnection: Sequelize) {
    TokenModel.init({
        email: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        refreshToken: {
            type: DataTypes.STRING
        }
    }, {
        sequelize: dbConnection,
        modelName: "Token"
    });
    TokenModel.sync();
}

export { TokenModel };
