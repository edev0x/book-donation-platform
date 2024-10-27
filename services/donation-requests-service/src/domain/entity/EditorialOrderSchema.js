const EntitySchema = require("typeorm").EntitySchema;
const EditorialOrder = require("../models/EditorialOrder");

module.exports = new EntitySchema({
    name: "EditorialOrders",
    tableName: "editorial_orders",
    target: EditorialOrder,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        book_id: {
            type: "int"
        },
        quantity: {
            type: "int"
        },
        request_date: {
            type: "timestamp"
        },
        reception_date: {
            type: "timestamp"
        },
        state: {
            type: "varchar"
        },
        created_at: {
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
        },
        created_by: {
            type: "varchar",
            default: "SYSTEM"
        },
        updated_at: {
            type: "timestamp",
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
            joinColumn: { name: "book_id" },
            eager: false
        }
    }
});