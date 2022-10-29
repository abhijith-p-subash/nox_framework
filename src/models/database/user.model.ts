import {
  Table,
  Model,
  Column,
  DataType,
  Length,
  BeforeCreate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

@Table({
  timestamps: true,
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  uid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone_code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Length({ min: 6 })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fire_base_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  facebootk_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  google_id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_login_at!: Date;

  @Column({
    type: DataType.DATE,
  })
  deletedAt!: Date;

  @BeforeCreate
  static createUID(instance: User) {
    instance.uid = uuidv4();
  }

  @BeforeCreate
  static createFullName(instance: User) {
    instance.full_name = `${instance.first_name} ${instance.last_name}`;
  }
}
