const Doctor = require("../models/doctor.model");
const User = require("../models/login.model");
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  return res.json(doctors);
};
const addDoctor = async (req, res) => {
  let { fristName, lastName, img } = req.body;
  img = req.uniqueSuffix;
  const doctor = new Doctor({ fristName, lastName, image: img });
  try {
    await doctor.save();
    return res.json({ msg: "تم اضافة البيانات بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const getDoctor = async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  res.status(200).json(doctor);
};
const updateDoctor = async (req, res) => {
  let data = req.body;
  data.image = req.uniqueSuffix;
  const id = req.params.id;
  try {
    const newDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({ msg: "done" });
  } catch (err) {
    console.log(err);
  }
};
const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Done Delete" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getDoctors,
  addDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
