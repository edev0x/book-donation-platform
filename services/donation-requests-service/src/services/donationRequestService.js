const DonationsRequestsRepository = require("../repositories/donationRequestsRepository");

const { publishQueue, consumerQueue } = require("../env").config;
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
      publishQueue,
      JSON.stringify(donationRequest)
    );

    this.requestsMap.set(donationRequest.id, {
      ...donationRequest,
      state: "PENDIENTE"
    });

    // Save the donation request to the database
    const createdDonationRequest =
      await this.donationsRequestsRepository.create(donationRequest);

    messageBroker.consume(consumerQueue, (data) => {
      const parsedData = JSON.parse(JSON.stringify(data));

      const { requestId } = parsedData;
      const request = this.requestsMap.get(requestId);

      if (request) {
        this.requestsMap.set(requestId, {
          ...request,
          state: "COMPLETADA"
        });

        console.info(`Request ${requestId} has been completed`);
      }
    });

    let request = this.requestsMap.get(donationRequest.id);
    while(request.state !== "COMPLETADA") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      request = this.requestsMap.get(donationRequest.id);
    }

    // Once the donation request is completed, return the object
    return { ...createdDonationRequest };
  }

  async findDonationRequestById(id) {
    return await this.donationsRequestsRepository.findDonationRequestById(id);
  }

  async findAllDonationRequests() {
    return await this.donationsRequestsRepository.findAllDonationRequests();
  }
}

module.exports = DonationRequestService;
