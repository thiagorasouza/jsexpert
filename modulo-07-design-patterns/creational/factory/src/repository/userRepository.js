class UserRepository {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  async find() {
    return this.dbConnection.find();
  }
}

module.exports = UserRepository;
