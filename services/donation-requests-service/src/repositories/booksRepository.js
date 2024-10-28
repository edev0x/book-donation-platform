const { appDataSource } = require("../data/connection");

const Book = require("../domain/models/Book");

class BooksRepository {
    constructor() {
        this.repository = appDataSource.getRepository(Book);
    }
    
    async create(book) {
        const createdBook = this.repository.create(book);
        return await this.repository.save(createdBook);
    }
    
    async findBookById(id) {
        return await this.repository.findOne({ where: { id: id } });
    }
    
    async findAllBooks() {
        return await this.repository.find();
    }
    
    async update(book) {
        await this.repository.update(book.id, book);
        return await this.repository.findOne({ where: { id: book.id } });
    }
    
    async delete(id) {
        return await this.repository.delete(id);
    }
};