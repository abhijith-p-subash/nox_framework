import {
  Table,
  Model,
  Column,
  DataType,
  Length,
  BeforeCreate,
} from "sequelize-typescript";
import sequlizeConnection from "../../config/database";
import { generateHash, uuid } from "../../core/utils/helpers";

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
    comment: "Tony",
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    comment: "Stark",
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING,
    comment: "Tony Stark",
    allowNull: true,
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    comment: "tony.stark@admin.com",
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    comment: "112233",
    allowNull: true,
  })
  phone_code!: string;

  @Column({
    type: DataType.STRING,
    comment: "9988774455",
    allowNull: false,
  })
  phone!: string;

  @Length({ min: 6 })
  @Column({
    type: DataType.STRING,
    comment: "123456",
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
    type: DataType.STRING || DataType.NUMBER,
    allowNull: true,
  })
  created_by!: any;

  @Column({
    type: DataType.STRING || DataType.NUMBER,
    allowNull: true,
  })
  updated_by!: any;

  @Column({
    type: DataType.STRING || DataType.NUMBER,
    allowNull: true,
  })
  deleted_by!: any;

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
    instance.uid = uuid();
  }

  @BeforeCreate
  static createFullName(instance: User) {
    if (!!instance.first_name && !!instance.last_name)
      instance.full_name = `${instance.first_name} ${instance.last_name}`;
  }

  @BeforeCreate
  static async encryptPassword(instance: User) {
    if (!!instance.password)
      instance.password = await generateHash(instance.password);
  }
}

sequlizeConnection.addModels([User]);
