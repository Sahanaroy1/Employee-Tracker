const { Pool } = require("pg");

class Database {
  constructor() {
   // this.options = options;
    this.db = null;
  }

 /* validate() {
    const { host, user, password, database } = this.options;
    if (!host || !user || !password || !database)
      throw new Error("Database configuration is Invalid.");
    return;
  }*/

  connect() {
    //this.validate();

    //const { host, user, password, database } = this.options;

    // Connect to database
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

  /*query(query, values) {
    this.db.query(query, values, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("result", res);
    });
  }*/

  disconnect() {
    this.db.disconnect();
  }
}

module.exports = Database;
