const DonationsRequestsRepository = require("../repositories/donationRequestsRepository");

/**
 * DonationRequestService class
 */
class DonationRequestService {
    constructor() {
        this.donationsRequestsRepository = new DonationsRequestsRepository();
    }

    async createDonationRequest(donationRequest) {
        const createdDonationRequest = await this.donationsRequestsRepository.create(donationRequest);
        return createdDonationRequest;
    }

    async findDonationRequestById(id) {
        return await this.donationsRequestsRepository.findDonationRequestById(id);
    }

    async findAllDonationRequests() {
        return await this.donationsRequestsRepository.findAllDonationRequests();
    }
}

module.exports = DonationRequestService;