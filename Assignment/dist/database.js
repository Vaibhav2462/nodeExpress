"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize"); //ORM
exports.sequelize = new sequelize_1.Sequelize("TaskExpress", //db name
"postgres", // db user name
"567567", //accessing db with a key
{
    host: "localhost",
    dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log("\n Db connected \n");
})
    .catch((error) => {
    console.log(`\n ${error} : error \n`);
});
