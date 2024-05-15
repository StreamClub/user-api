import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "@dal";

class FriendModel extends Model {
    declare userId1: number;
    declare userId2: number;
}

export function initFriendModel(dbConnection: Sequelize) {
    FriendModel.init({
        userId1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId2: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize: dbConnection,
        modelName: "Friend"
    });
    FriendModel.belongsTo(UserModel, { foreignKey: 'userId1' });
    FriendModel.belongsTo(UserModel, { foreignKey: 'userId2' });

    FriendModel.sync();
}


export { FriendModel };
