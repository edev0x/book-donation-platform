const { Router } = require("express");
const router = Router();

const { body } = require("express-validator");

const DonationsRequestsController = require("../controller/donations.controller");
const donationsRequestsController = new DonationsRequestsController();

router.get("/health", (req, res) => {
  res.status(200).send({
    status: "Ok",
  });
});

router.post(
  "/process",
  body("requestId").notEmpty().withMessage("requestId field is required"),
  body("book").notEmpty().withMessage("book field is required"),
  body("created_by").notEmpty().withMessage("created_by field is required"),
  donationsRequestsController.createDonationRequest
);

module.exports = router;
