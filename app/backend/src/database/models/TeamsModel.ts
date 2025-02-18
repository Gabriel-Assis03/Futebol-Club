import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '.';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default TeamsModel;
