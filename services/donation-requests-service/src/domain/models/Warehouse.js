class Warehouse {
  constructor(
    id,
    book_id,
    quantity,
    created_at,
    created_by,
    updated_at,
    updated_by
  ) {
    this.id = id;
    this.book_id = book_id;
    this.quantity = quantity;
    this.created_at = created_at;
    this.created_by = created_by;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
  }
}

module.exports = Warehouse;