import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://StreamClub:DatosauriosFiuba@user_db_service/user_db');
export const UserDal = sequelize.define('User', {
  userName: DataTypes.STRING,
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});