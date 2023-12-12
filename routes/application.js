var express = require("express");
var router = express.Router();
const verifyToken = require("../middlewares/verfiedToken");
const applicationControll = require("../controllers/application.control");

router.post("/login", applicationControll.Login);
router.get("/get-data", verifyToken, applicationControll.getData);

module.exports = router;
