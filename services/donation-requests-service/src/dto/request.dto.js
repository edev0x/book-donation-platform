class DonationRequestDto {
  constructor(requestId, book, created_by) {
    this.requestId = requestId;
    this.book = book;
    this.created_by = created_by;
  }
}

module.exports = DonationRequestDto;