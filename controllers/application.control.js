const aboutAppModel = require("../models/aboutApp.model");
const Student = require("../models/students.model");
const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const scheduleModel = require("../models/schedule.model");
const milityEduModel = require("../models/mility-edu.model");
const examsTableModel = require("../models/exams-table.model");
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
  user.squad = user.squad.split(" ")[1];
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
      return res.status(404).json({ msg: "لا يوجد جداول حتي الان" });
    const currentSchedule = schedule.filter((sch) => {
      return (
        String(sch.classRoom) === String(current.squad) &&
        String(sch.academicDivision) === String(current.section) &&
        String(sch.type) === String("جدول المحاضرات")
      );
    });
    if (currentSchedule.length !== 0) {
      return res.status(200).json(currentSchedule[0]);
    } else {
      return res.status(404).json({ msg: "لا يوجد جدول لهذا القسم" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const getScheduleSection = async (req, res) => {
  try {
    const id = req.current;
    const current = await Student.findById(id);
    if (!current) return res.status(404).json({ msg: "الطالب غير سجل" });
    const schedule = await scheduleModel.find().lean();
    if (schedule.length == 0)
      return res.status(404).json({ msg: "لا يوجد جداول حتي الان" });
    const currentSchedule = schedule.filter((sch) => {
      return (
        String(sch.classRoom) === String(current.squad) &&
        String(sch.academicDivision) === String(current.section) &&
        String(sch.type) === String("جدول السكاشن")
      );
    });
    if (currentSchedule.length !== 0) {
      return res.status(200).json(currentSchedule[0]);
    } else {
      return res.status(404).json({ msg: "لا يوجد جدول لهذا القسم" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const MilitaryEducation = async (req, res) => {
  const id = req.current;
  try {
    const data = await milityEduModel.findOne({ studentId: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const examTable = async (req, res) => {
  const student = req.current;
  const data = await examsTableModel.find();
  if (data.length == 0)
    return res.status(404).json({ msg: "لم يتم اضافة جداول حتي الأن" });
  const currentData = data.filter((data) => {
    return (
      String(student.section) === String(data.academicDivision) &&
      String(student.squad) === String(data.classRoom)
    );
  });
  if (currentData.length == 0)
    return res.status(404).json({ msg: "لا يوجد جدول لهذا القسم" });
  return res.status(200).json(currentData[0]);
};
module.exports = {
  Login,
  getData,
  getDoctors,
  getContent,
  getSchedule,
  MilitaryEducation,
  getScheduleSection,
  examTable,
};
