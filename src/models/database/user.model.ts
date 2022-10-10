import { DataTypes, Model, Optional } from "sequelize";
import sequlizeConnection from "../../config/database";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface userInput extends Optional<UserAttributes, "id"> {}
export interface userOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, userInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequlizeConnection,
    paranoid: true,
  }
);

export default User;
