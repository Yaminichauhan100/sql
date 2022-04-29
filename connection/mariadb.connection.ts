import { Sequelize } from "sequelize";

export let sequelize = new Sequelize("db", "admin", "root", {
  host: "localhost",
  dialect: "mariadb",
});



