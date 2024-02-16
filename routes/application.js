var express = require("express");
var router = express.Router();
const verifyToken = require("../middlewares/verfiedToken");
const applicationControll = require("../controllers/application.control");

router.post("/login", applicationControll.Login);
router.get("/get-data", verifyToken, applicationControll.getData);
router.get("/get-doctors", verifyToken, applicationControll.getDoctors);
router.get("/get-content", verifyToken, applicationControll.getContent);
router.get("/schedule", verifyToken, applicationControll.getSchedule);
router.get(
  "/schedule-section",
  verifyToken,
  applicationControll.getScheduleSection
);
router.get("/mility-edu", verifyToken, applicationControll.MilitaryEducation);
router.get("/exam-table", verifyToken, applicationControll.examTable);
router.get("/cumulative", verifyToken, applicationControll.addCumulative);
module.exports = router;
