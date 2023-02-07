import { Table, Model, Column, DataType } from "sequelize-typescript";
import sequlizeConnection from "../../../../config/database";

@Table({
  timestamps: true,
  tableName: "Goods",
})
export class Good extends Model {
  @Column({
    type: DataType.STRING,
    comment: "Tony",
    allowNull: false,
  })
  name!: string;
}

sequlizeConnection.addModels([Good]);
