const aboutAppModel = require("../models/aboutApp.model");
const Student = require("../models/students.model");
const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const scheduleModel = require("../models/schedule.model");
const milityEduModel = require("../models/mility-edu.model");
const Login = async (req, res) => {
  const { num, password } = req.body;
  const user = await Student.findOne({ num: num });
  if (!user)
    return res
      .status(404)
      .json({ msg: "رقمك القومي غير مسجل في قواعد البيانات لدينا !" });
  if (user.password !== password)
    return res.status(404).json({ msg: "Wrong Password" });
  const id = user._id;
  const token = jwt.sign({ num, id }, process.env.SECRET_TOKEN);
  user.password = undefined;
  return res.status(200).json({ user, token });
};
const getData = (req, res) => {
  return res.status(200).json({ msg: "done" });
};
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  return res.json(doctors);
};
const getContent = async (req, res) => {
  const content = await aboutAppModel.find();
  return res.status(200).json(content[0]);
};
const getSchedule = async (req, res) => {
  try {
    const id = req.current;
    const current = await Student.findById(id);
    if (!current) return res.status(404).json({ msg: "الطالب غير سجل" });
    const schedule = await scheduleModel.find().lean();
    if (schedule.length == 0)
      res.status(404).json({ msg: "لا يوجد جداول حتي الان" });
    const currentSchedule = schedule.filter((sch) => {
      return (
        String(sch.classRoom) === String(current.squad) &&
        String(sch.academicDivision) === String(current.section)
      );
    });
    return res.status(200).json(currentSchedule);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const MilitaryEducation = async (req, res) => {
  const id = req.current;
  try {
    const data = await milityEduModel.findOne({ studentId: id });
    if (!data) return res.status(404).json(null)
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
    
  }
};
module.exports = {
  Login,
  getData,
  getDoctors,
  getContent,
  getSchedule,
  MilitaryEducation,
};
