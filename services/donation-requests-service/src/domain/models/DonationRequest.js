class DonationRequest {
  constructor(
    id,
    book_id,
    request_date,
    state,
    created_at,
    created_by,
    updated_at,
    updated_by
  ) {
    this.id = id;
    this.book_id = book_id;
    this.request_date = request_date;
    this.state = state;
    this.created_at = created_at;
    this.created_by = created_by;
    this.updated_at = updated_at;
    this.updated_by = updated_by;
  }
}

module.exports = DonationRequest;
