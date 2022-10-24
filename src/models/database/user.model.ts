// import {DataType, Model, Optional} from 'sequelize';
// import sequelizeConnection from '../../config/database';

// interface UserAttributes {
//     id: number;
//     name: string;
//     createdAt?: Date;
//     updatedAt?:Date;
//     deletedAt?:Date;
// }


import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName:'users',
})

export class User extends Model {
    @Column({
        type: DataType.NUMBER,
        
    })
    @Column({
        type:DataType.STRING,
        allowNull: false
    })
    name!:string;
}