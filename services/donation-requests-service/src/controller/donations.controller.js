const DonationRequest = require("../domain/models/DonationRequest");
const DonationRequestDto = require("../dto/request.dto");
const uuid = require("uuid");
const { rabbitQueue, mqOptions, rabbitMqUri } = require("../env").config;

const { validationResult } = require("express-validator");

const messageBroker = require("../utils/messageBroker");
const DonationRequestService = require("../services/donationRequestService");

class DonationsRequestsController {
  constructor() {
    this.donationRequestsMap = new Map();
    this.createDonationRequest = this.createDonationRequest.bind(this);
    this.donationRequestService = new DonationRequestService();
  }

  async createDonationRequest(req, res, next) {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Invalid request parameters",
          errors: errors.array(),
        });
      }

      const { requestId, book, created_by } = req.body;
      const donationRequest = new DonationRequestDto(
        requestId,
        book,
        created_by
      );

      const requestResult =
        await this.donationRequestService.createDonationRequest(
          donationRequest
        );

      res
        .status(201)
        .json({
          result: {
            message: "Donation request created successfully",
            code: 201,
            data: { ...requestResult, status: "PENDING" },
          },
        });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

module.exports = DonationsRequestsController;
