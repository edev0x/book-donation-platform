const Book = require("../domain/models/Book");

const { connectToDataSource } = require("../data/connection");

/**
 * @class BooksRepository
 * @description Repository class for books entity
 * @exports BooksRepository
 * 
 * @author edev0x
 * @version 0.0.1
 */
class BooksRepository {
  repository = null;
  repositoryDataSource = null;

  constructor() {
    this.initialize();
  }

  async initialize() {
    this.repositoryDataSource = await connectToDataSource();
    this.repository = this.repositoryDataSource.getRepository(Book);
  }

  /**
   * 
   * @param {Object} book
   * @returns {Promise<Object>} book
   */
  async create(book) {
    const createdBook = this.repository.create(book);
    return await this.repository.save(createdBook);
  }

  async findBookById(id) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAllBooks() {
    return await this.repository
      .createQueryBuilder("book")
      .select(["book.id", "book.title", "book.author", "book.isbn"])
      .getMany();
  }

  async update(book) {
    await this.repository.update(book.id, book);
    return await this.repository.findOne({ where: { id: book.id } });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }

  async findByTitle(title) {
    return await this.repository.findOne({ where: { title: title } });
  }

  async purge() {
    await this.repository.delete({});
  }
}

module.exports = BooksRepository;
