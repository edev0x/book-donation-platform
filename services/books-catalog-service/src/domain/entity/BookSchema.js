const EntitySchema = require("typeorm").EntitySchema;
const Book = require("../models/Book");

module.exports = new EntitySchema({
    name: "Book",
    tableName: "books",
    target: Book,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        author: {
            type: "varchar"
        },
        isbn: {
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
            nullable: true,
            onUpdate: "CURRENT_TIMESTAMP"
        },
        updated_by: {
            type: "varchar",
            nullable: true,
            onUpdate: "CURRENT_TIMESTAMP"
        }
    },
});