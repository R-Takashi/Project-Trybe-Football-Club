import { INTEGER, STRING, Model } from 'sequelize';
import database from '.';

export default class User extends Model {
  id!: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  id: INTEGER,
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: database,
  tableName: 'users',
  timestamps: false,
});
