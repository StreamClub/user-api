import { config } from '@config';
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(config.dbUrl);
export const UserDal = sequelize.define('User', {
  userName: DataTypes.STRING,
  displayName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});
