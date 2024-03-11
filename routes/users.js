var express = require("express");
var router = express.Router();
const multer = require("multer");
const userControll = require("../controllers/user.controll");
const removeBg = require("../middlewares/removebg");
/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/students/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `user-${Date.now()}.${mimetype}`;
    req.uniqueSuffix = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});

const storageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/users/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `user-${Date.now()}.${mimetype}`;
    req.uniqueSuffix = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });
const uploadUsers = multer({ storage: storageUsers });

router.post("/login", userControll.Login);
router.get("/students", userControll.getStudents);
router.post(
  "/add-new-user",

  upload.single("img"),
  userControll.addNewStudent
);
router.post(
  "/update-student/:id",

  upload.single("img"),
  userControll.updateStudent
);
router.put(
  "/update-data/:id",

  uploadUsers.single("img"),
  userControll.updateData
);
router.get("/get-student/:id", userControll.getStudent);
router.delete("/delete-student/:id", userControll.deleteStudent);
router.delete("/delete-class-schedules/:id", userControll.deleteSchedules);
router.put("/add-seating-numbers", userControll.addSeatingNumbers);
router.post("/class-schedules", userControll.classSchedules);
router.get("/class-schedules", userControll.getClassSchedules);
router.get("/class-schedules/:id", userControll.getSchedule);
router.put("/class-schedules/:id", userControll.editSchedule);
router.post("/exams-table", userControll.examsTable);
router.put("/goal-application/:id", userControll.GoalApplication);
router.get("/goal-application", userControll.getContent);
router.post("/update-password/:id", userControll.updatePassword);
router.post("/mility-edu", userControll.MilitaryEducation);
router.post("/add-cumulative", userControll.addCumulative);
router.post("/committe", userControll.addCommitte);
module.exports = router;
