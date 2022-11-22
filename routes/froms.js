const express = require("express");

const formsController = require("../controllers/forms");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/administrative-investigation", isAuth, formsController.getAIF);
router.post("/administrative-investigation", isAuth, formsController.postAIF);

router.get("/receipt-of-the-car", isAuth, formsController.getARTCF);
router.post("/receipt-of-the-car", isAuth, formsController.postARTCF);

router.get("/receipt-of-the-list", isAuth, formsController.getARTLF);
router.post("/receipt-of-the-list", isAuth, formsController.postARTLF);

router.get("/Penalty-procedure", isAuth, formsController.getPPF);
router.post("/Penalty-procedure", isAuth, formsController.postPPF);

router.get("/job-mission-request", isAuth, formsController.getJMRF);
router.post("/job-mission-request", isAuth, formsController.postJMRF);

router.get("/delegation-of-authority", isAuth, formsController.getDAF);
router.post("/delegation-of-authority", isAuth, formsController.postDAF);

router.get("/receipt-of-custody", isAuth, formsController.getARCF);
router.post("/receipt-of-custody", isAuth, formsController.postARCF);

router.get("/identification-model", isAuth, formsController.getIMF);
router.post("/identification-model", isAuth, formsController.postIMF);

router.get("/clearance", isAuth, formsController.getCF);
router.post("/clearance", isAuth, formsController.postCF);

module.exports = router;
