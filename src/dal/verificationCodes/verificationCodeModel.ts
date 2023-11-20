import { DataTypes, Model, Sequelize } from "sequelize";


class VerificationCodeModel extends Model {
    declare email: string;
    declare verificationCode: number;
}

export function initVerificationCodeModel(dbConnection: Sequelize) {
    VerificationCodeModel.init({
        email: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
        },
        verificationCode: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize: dbConnection,
        modelName: "VerificationCode"
    });
    VerificationCodeModel.sync();
}

export { VerificationCodeModel };
