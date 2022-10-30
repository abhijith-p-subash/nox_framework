import {Sequelize} from "sequelize-typescript";
;

const sequlizeConnection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '0000',
  database: 'nox',
  logging: false,
})


export default sequlizeConnection;