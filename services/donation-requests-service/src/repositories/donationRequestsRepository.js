const DonationRequest = require("../domain/models/DonationRequest").DonationRequest;
const { AppDataSource: appDataSource } = require("../app");

class DonationRequestRepository {
  constructor() {
    this.repository = appDataSource.getRepository(DonationRequest);
  }

  async create(donationRequest) {
    const createdRequest = this.repository.create(donationRequest);
    return await this.repository.save(createdRequest);
  }

  async findDonationRequestById(id) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findAllDonationRequests() {
    return await this.repository.find();
  }

  async update(donationRequest) {
    await this.repository.update(donationRequest.id, donationRequest);
    return await this.repository.findOne({ where: { id: donationRequest.id } });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = DonationRequestRepository;
