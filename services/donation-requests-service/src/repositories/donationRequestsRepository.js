const DonationRequest = require("../domain/models/DonationRequest");

const { connectToDataSource } = require("../data/connection");

class DonationRequestRepository {

  repositoryDataSource = null;
  repository = null;

  constructor() {
    this.initialize();
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

  async initialize() {
    this.repositoryDataSource = await connectToDataSource();
    this.repository = this.repositoryDataSource.getRepository(DonationRequest);
  }
}

module.exports = DonationRequestRepository;
