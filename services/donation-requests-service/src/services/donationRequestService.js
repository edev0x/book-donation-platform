const DonationsRequestsRepository = require("../repositories/donationRequestsRepository");

const { rabbitQueue } = require("../env").config;
const messageBroker = require("../utils/messageBroker");

/**
 * DonationRequestService class
 */
class DonationRequestService {
  constructor() {
    this.donationsRequestsRepository = new DonationsRequestsRepository();
    this.requestsMap = new Map();
  }

  async createDonationRequest(donationRequest) {
    // Publish the donation request to the message broker
    await messageBroker.publishMessage(
      rabbitQueue,
      JSON.stringify(donationRequest)
    );

    this.requestsMap.set(donationRequest.id, {
      ...donationRequest,
      status: "PENDING",
    });

    // Save the donation request to the database
    const createdDonationRequest =
      await this.donationsRequestsRepository.create(donationRequest);

    // Once the donation request is completed, return the object
    return { ...createdDonationRequest, status: "PENDING" };
  }

  async findDonationRequestById(id) {
    return await this.donationsRequestsRepository.findDonationRequestById(id);
  }

  async findAllDonationRequests() {
    return await this.donationsRequestsRepository.findAllDonationRequests();
  }
}

module.exports = DonationRequestService;
