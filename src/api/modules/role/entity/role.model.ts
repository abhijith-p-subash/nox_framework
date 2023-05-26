import { Table, Model, Column, DataType } from "sequelize-typescript";
import sequlizeConnection from "../../../../config/database";
import { Roles } from "./role.type";

@Table({
  timestamps: true,
  tableName: "Role",
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    comment: "Tony",
    allowNull: false,
  })
  name!: string;
  @Column({
    type: DataType.ENUM(),
    defaultValue: "admin",
    values: [...Object.keys(Roles)],
  })
  role!: Roles;
}

sequlizeConnection.addModels([Role]);
