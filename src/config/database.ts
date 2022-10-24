// import { Dialect, Model, Sequelize } from "sequelize";

// const isTest = process.env.NODE_ENV === "test";

// const dbName = isTest
//   ? (process.env.TEST_DB_NAME as string)
//   : (process.env.DB_NAME as string);
// const dbUser = process.env.DB_USER as string;
// const dbHost = process.env.DB_HOST;
// const dbDriver = process.env.DB_DRIVER as Dialect;
// const dbPassword = process.env.DB_PASSWORD;

// const sequlizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
//   host: dbHost,
//   dialect: dbDriver,
//   logging: false,
// });

// export default sequlizeConnection;


import {Sequelize} from "sequelize-typescript";
import { User } from "../models/database/user.model";

const sequlizeConnection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '0000',
  database: 'nox',
  logging: false,
  models: [User]
})


export default sequlizeConnection;