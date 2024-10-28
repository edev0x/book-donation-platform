const EntitySchema = require("typeorm").EntitySchema;
const Warehouse = require("../models/Warehouse");

module.exports = new EntitySchema({
    name: "Warehouse",
    tableName: "warehouse",
    target: Warehouse,
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
            type: "int",
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