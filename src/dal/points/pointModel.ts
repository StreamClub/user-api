import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "@dal";

class PointModel extends Model {
    declare userId: number;
    declare amount: number;
}

export function initPointModel(dbConnection: Sequelize) {
    PointModel.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize: dbConnection,
        modelName: "Point"
    });
    PointModel.belongsTo(UserModel, { foreignKey: 'userId' });

    PointModel.sync();
}


export { PointModel };
