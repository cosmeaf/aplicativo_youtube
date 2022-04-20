const Sequelize = require("sequelize");
const database = require("../instances/dbConnect");

const Videos = database.define(
  "Videos",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    video_title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    video_url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    video_quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    videos_views: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "tbl_videos",
    timestamps: true,
  }
);
module.exports = Videos;
