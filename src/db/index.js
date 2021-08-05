const Sequelize = require("sequelize");

if (!process.env.DATABASE_URL) {
  console.warn("process.env.DATABASE_URL is missing, using the default database URL");
}
const db = new Sequelize(process.env.DATABASE_URL || "postgres://localhost:5432/DowJonesIndex", {
  logging: false
});

module.exports = exports = db;
