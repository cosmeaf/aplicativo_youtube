const Sequelize = require("sequelize");
const database = require("../instances/dbConnect");

const User = database.define(
  "Users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user_password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cell_phone_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tbl_users",
    timestamps: true,
  }
);
module.exports = User;
