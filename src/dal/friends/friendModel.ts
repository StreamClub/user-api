import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "@dal";

class FriendModel extends Model {
    declare senderId: number;
    declare receiverId: number;
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
        modelName: "FriendRequest"
    });
    FriendModel.belongsTo(UserModel, { foreignKey: 'userId1' });
    FriendModel.belongsTo(UserModel, { foreignKey: 'userId2' });

    FriendModel.sync();
}


export { FriendModel };
