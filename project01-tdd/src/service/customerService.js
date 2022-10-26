const BaseRepository = require("../repository/base/baseRepository");

class CustomerService {
  constructor({ customersDatabaseFilePath }) {
    this.customerRepository = new BaseRepository({
      filePath: customersDatabaseFilePath,
    });
  }

  async getCustomerById(customerId) {
    return this.customerRepository.find(customerId);
  }
}

module.exports = CustomerService;
