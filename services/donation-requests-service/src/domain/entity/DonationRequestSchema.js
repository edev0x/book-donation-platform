const EntitySchema = require("typeorm").EntitySchema;
const DonationRequest = require("../models/DonationRequest").DonationRequest;
const Book = require("../models/Book").Book;

module.exports = new EntitySchema({
    name: "DonationRequest",
    target: DonationRequest,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        book_id: {
            type: "int"
        },
        request_date: {
            type: "date"
        },
        state: {
            type: "varchar"
        },
        created_at: {
            type: "timestamp"
        },
        created_by: {
            type: "varchar"
        },
        updated_at: {
            type: "timestamp"
        },
        updated_by: {
            type: "varchar"
        }
    },
    relations: {
        book: {
            target: "Book",
            type: "many-to-one",
            joinColumn: true,
            eager: false
        }
    }
});