"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("./database");
exports.User = database_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    paranoid: true,
    deletedAt: "user-deactivated",
});
