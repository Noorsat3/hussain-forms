const express = require("express");

const loginController = require("../controllers/login");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", loginController.getLogin);

router.get("/home", isAuth, loginController.getHome);

router.post("/home", loginController.postLogin);

module.exports = router;
