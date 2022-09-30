import { INTEGER, BOOLEAN, Model } from 'sequelize';
import Team from './teams.model';
import database from '.';

export default class Match extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,

  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: database,
  tableName: 'matches',
  modelName: 'Match',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'home_team', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'awayTeam' });
