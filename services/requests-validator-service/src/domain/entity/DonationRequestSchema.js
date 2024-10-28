const EntitySchema = require("typeorm").EntitySchema;
const DonationRequest = require("../models/DonationRequest");

module.exports = new EntitySchema({
    name: "DonationRequest",
    tableName: "donation_requests",
    target: DonationRequest,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        book_id: {
            type: "int",
            name: "book_id",
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
        books: {
            target: "Book",
            type: "many-to-one",
            joinColumn: true,
            joinColumn: { name: "book_id" },
            eager: false
        }
    }
});