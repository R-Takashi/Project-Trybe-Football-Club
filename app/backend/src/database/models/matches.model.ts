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
  id: INTEGER,
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

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'home_team', as: 'homeTeamMatch' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'awayTeamMatch' });
