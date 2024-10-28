const { Router } = require("express");
const router = Router();

const { body, query } = require("express-validator");

const BooksController = require("../controller/books.controller");

const booksController = new BooksController();

router.get("/health", (req, res) => {
  res.status(200).send({
    status: "Ok",
  });
});

router.post(
  "/create",
  body("title").notEmpty().withMessage("title field is required"),
  body("author").notEmpty().withMessage("author field is required"),
  body("isbn").notEmpty().withMessage("isbn field is required"),
  body("created_by").notEmpty().withMessage("created_by field is required"),
  booksController.createBook
);

router.get(
  "/search",
  query("title")
    .isString()
    .withMessage("Title field must be a string")
    .notEmpty()
    .withMessage("Title field is required"),
  booksController.searchBookByTitle
);

router.get("/list", booksController.getAllBooks);

router.post("/purge", booksController.purgeData);

module.exports = router;
