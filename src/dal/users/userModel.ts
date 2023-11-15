import { DataTypes, Model, Sequelize } from "sequelize";


class UserModel extends Model {
  declare email: string;
  declare userName: string;
  declare displayName: string;
  declare password: string;
}

export function initUserModel(dbConnection: Sequelize) {
  UserModel.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize: dbConnection,
    modelName: "User"
  });

  UserModel.sync();
}

export { UserModel };
