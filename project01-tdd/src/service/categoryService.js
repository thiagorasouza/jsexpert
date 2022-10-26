const BaseRepository = require("../repository/base/baseRepository");

class CategoryService {
  constructor({ categoryDatabaseFilePath }) {
    this.categoryRepository = new BaseRepository({
      filePath: categoryDatabaseFilePath,
    });
  }

  async getCategoryById(categoryId) {
    return this.categoryRepository.find(categoryId);
  }
}

module.exports = CategoryService;
