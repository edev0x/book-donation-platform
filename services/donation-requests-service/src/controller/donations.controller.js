const DonationRequest = require("../domain/models/DonationRequest");
const DonationRequestDto = require("../dto/request.dto");
const uuid = require("uuid");

class DonationsRequestsController {
    constructor() {
        this.createDonationRequest = this.createDonationRequest.bind(this);
    }

    async createDonationRequest(req, res, next) {
        try {
            const { requestId, created_by } = req.body;
            const donationRequest = new DonationRequestDto(requestId, created_by);

            res.status(201).send({ message: "Donation request created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal server error' });
        }
    }
}

module.exports = DonationsRequestsController;