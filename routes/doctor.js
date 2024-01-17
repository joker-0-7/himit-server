var express = require("express");
var router = express.Router();
const doctorControll = require("../controllers/doctor.control");
const multer = require("multer");
const removeBg = require("../middlewares/removebg");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "public/images/doctors/");
  },
  filename: function (req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uniqueSuffix = `user-${Date.now()}.${mimetype}`;
    req.uniqueSuffix = uniqueSuffix;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.get("/", doctorControll.getDoctors);
router.post(
  "/add-doctor",
  upload.single("img"),
  removeBg,
  doctorControll.addDoctor
);
router.get("/get-doctor/:id", doctorControll.getDoctor);
router.put(
  "/update-doctor/:id",
  upload.single("img"),
  doctorControll.updateDoctor
);
router.delete("/delete-doctor/:id", doctorControll.deleteDoctor);
module.exports = router;
