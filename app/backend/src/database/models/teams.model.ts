import { INTEGER, STRING, Model } from 'sequelize';
import database from '.';

export default class Team extends Model {
  id!: number;
  teamName: string;
}

Team.init({
  id: INTEGER,
  teamName: STRING,
}, {
  underscored: true,
  sequelize: database,
  tableName: 'teams',
  modelName: 'Team',
  timestamps: false,
});
