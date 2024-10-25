class Book {
    constructor(id, title, author, isbn, total_samples, created_at, created_by, updated_at, updated_by) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.total_samples = total_samples;
        this.created_at = created_at;
        this.created_by = created_by;
        this.updated_at = updated_at;
        this.updated_by = updated_by;
    }
}

module.exports = { Book };