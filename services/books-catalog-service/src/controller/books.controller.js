const BooksService = require("../services/booksService");

const { validationResult } = require("express-validator");

/**
 * 
 * @class BooksController
 * 
 * @author edev0x
 * @version 0.0.1
 * @exports BooksController
 */
class BooksController {
  constructor() {
    this.booksService = new BooksService();

    this.createBook = this.createBook.bind(this);
    this.searchBookByTitle = this.searchBookByTitle.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
    this.purgeData = this.purgeData.bind(this);
  }

  async createBook(req, res, next) {
    const errors = validationResult(req);
    const { title, author, isbn, created_by } = req.body;
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid request parameters",
          errors: errors.array(),
        });
      }

      const book = await this.booksService.createBook({
        title,
        author,
        isbn,
        created_by,
      });

      return res.status(201).json({
        result: {
          message: "Book created successfully",
          code: 201,
          data: { ...book },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        error: `An error ocurred while trying to create a new record for book ${title}`,
      });
    }
  }

  async searchBookByTitle(req, res, next) {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid request parameters",
          errors: errors.array(),
        });
      }

      const { title } = req.query;
      const book = await this.booksService.findBookByTitle(title);

      if (!book) {
        return res.status(404).json({
          result: {
            message: "No books has been found with the specified criteria.",
            code: 404,
            data: [],
          },
        });
      }

      return res.status(200).json({
        result: {
          message: "Operation completed.",
          code: 200,
          data: { ...book },
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "An error ocurred while trying to fetch book's information.",
      });
    }
  }

  async getAllBooks(req, res, next) {
    try {
      const booksRecords = await this.booksService.findAll();

      const booksArray = Object.values(booksRecords);

      return res.status(200).json({
        result: {
          message: "Operation completed.",
          code: 200,
          data: booksArray,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ error: "An error ocurred while trying to fetch books data." });
    }
  }

  async purgeData(req, res, next) {
    try {
      await this.booksService.purgeData();

      return res.status(200).json({
        result: {
          message:
            "Operation completed. This cannot be undone!",
          code: 200,
          data: [],
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ error: "An error ocurred while trying to purge books data." });
    }
  }
}

module.exports = BooksController;
