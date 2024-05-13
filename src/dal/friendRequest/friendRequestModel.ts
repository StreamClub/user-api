import { DataTypes, Model, Sequelize } from "sequelize";
import { UserModel } from "@dal";


class FriendRequestModel extends Model {
    declare senderId: number;
    declare receiverId: number;
}

export function initFriendRequestModel(dbConnection: Sequelize) {
    FriendRequestModel.init({
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize: dbConnection,
        modelName: "FriendRequest"
    });

    FriendRequestModel.sync();
}

export { FriendRequestModel }

// FriendRequestModel.belongsTo(UserModel, { foreignKey: 'senderId' });
// FriendRequestModel.belongsTo(UserModel, { foreignKey: 'receiverId' });