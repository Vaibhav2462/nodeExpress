import { Sequelize } from "sequelize"; //ORM

export const sequelize = new Sequelize(
  "TaskExpress", //db name
  "postgres", // db user name
  "567567", //accessing db with a key
  {
    host: "localhost",
    dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("\n Db connected \n");
  })
  .catch((error) => {
    console.log(`\n ${error} : error \n`);
  });