class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async find() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      user.name = user.name.toUpperCase();
      return user;
    });
  }
}

module.exports = UserService;
