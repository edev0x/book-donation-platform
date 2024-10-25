class DonationRequestDto {
  constructor(requestId, created_by) {
    this.requestId = requestId;
    this.created_by = created_by;
  }
}

module.exports = DonationRequestDto;