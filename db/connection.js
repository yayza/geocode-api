const knex = require("knex");

const dbConn = knex({
  client: "sqlite3",
  connection: {
    filename: "db/_db.sqlite3",
  },
});

module.exports = dbConn;
