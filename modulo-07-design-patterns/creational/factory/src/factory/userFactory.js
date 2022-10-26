const Database = require("../util/database");
const UserService = require("../service/userService");
const UserRepository = require("../repository/userRepository");

class UserFactory {
  static async getInstance() {
    const db = new Database("connection:string");
    const dbConnection = await db.connect();
    const userRepository = new UserRepository(dbConnection);
    const userService = new UserService(userRepository);
    return userService;
  }
}

module.exports = UserFactory;

// (async () => {
//   const user = await UserFactory.getInstance();
//   console.log("🚀 ~ user", user);
//   const users = await user.find();
//   console.log("🚀 ~ users", users);
// })();
