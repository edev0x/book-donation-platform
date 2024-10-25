const { Router } = require("express");
const router = Router();

const DonationsRequestsController = require("../controller/donations.controller");
const donationsRequestsController = new DonationsRequestsController();

router.get("/health", (req, res) => {
    res.status(200).send({
        status: "Ok"
    });
});


router.post("/init", donationsRequestsController.createDonationRequest);

module.exports = router;