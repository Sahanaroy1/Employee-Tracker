const { Pool } = require("pg");

class Database {
  constructor() {
    this.db = null;
  }

  connect() {

    this.db = new Pool(
      {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,  
      },
      console.log(`Connected to the Employees database.`)
    );

    this.db.connect();
  }

  disconnect() {
    this.db.disconnect();
  }
}

module.exports = Database;
