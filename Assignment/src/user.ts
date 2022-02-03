import { DataTypes } from "sequelize";
import { sequelize } from "./database";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    paranoid: true,
    deletedAt: "user-deactivated",
  }
);