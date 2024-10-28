const BooksRepository = require("../repositories/booksRepository");

/**
 * @class BooksService
 * @description Service class for books entity 
 * 
 * @author edev0x
 * @exports BooksService
 * @version 0.0.1
 **/
class BooksService {
  constructor() {
    this.booksRepository = new BooksRepository();
  }

  async createBook(book) {
    return await this.booksRepository.create(book);
  }

  async findBookById(id) {
    return await this.booksRepository.findBookById(id);
  }

  async findBookByTitle(title) {
    return await this.booksRepository.findByTitle(title);
  }

  async findAll() {
    return await this.booksRepository.findAllBooks();
  }

  async purgeData() {
    return await this.booksRepository.purge();
  };
}

module.exports = BooksService;
