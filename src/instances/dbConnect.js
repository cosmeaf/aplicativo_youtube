const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
  }
);
module.exports = sequelize;
