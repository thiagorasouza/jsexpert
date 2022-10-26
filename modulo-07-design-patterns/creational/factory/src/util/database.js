class Database {
  constructor(connectionString) {
    this.connectionString = connectionString;
  }

  async connect() {
    await this.sleep(500);
    return this;
  }

  async find() {
    await this.sleep(500);
    return [
      { name: "John", age: 25 },
      { name: "Doe", age: 30 },
    ];
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// (async () => {
//   const db = new Database("connection:string");
//   const dbConnection = await db.connect();
//   console.log("🚀 ~ dbConnection", dbConnection);
//   const users = await dbConnection.find();
//   console.log("🚀 ~ users", users);
// })();

module.exports = Database;
