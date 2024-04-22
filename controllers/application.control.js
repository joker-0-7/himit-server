const aboutAppModel = require("../models/aboutApp.model");
const Student = require("../models/students.model");
const Doctor = require("../models/doctor.model");
const jwt = require("jsonwebtoken");
const scheduleModel = require("../models/schedule.model");
const milityEduModel = require("../models/mility-edu.model");
const examsTableModel = require("../models/exams-table.model");
const {
  EXAM_TABLE,
  USER_NOT_FOUND,
  WROMG_PASSWORD,
  SECTION_NOT_FOUND,
  CURRENT_SECTION_NOT_FOUND,
} = require("../constants/msg");
const cumulativeModel = require("../models/cumulative.model");
const Login = async (req, res) => {
  const { num, password } = req.body;
  console.log(num, password)
  console.log(typeof num, typeof password)
  const user = await Student.findOne({ num: num });
  if (!user) return res.status(404).json({ msg: USER_NOT_FOUND });
  if (user.password !== password)
    return res.status(404).json({ msg: WROMG_PASSWORD });
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
    const schedule = await scheduleModel.find().lean();
    if (schedule.length == 0)
      return res.status(404).json({ msg: SECTION_NOT_FOUND });
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
      return res.status(404).json({ msg: CURRENT_SECTION_NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: SECTION_NOT_FOUND });
  }
};
const getScheduleSection = async (req, res) => {
  try {
    const id = req.current;
    const current = await Student.findById(id);
    const schedule = await scheduleModel.find().lean();
    if (schedule.length == 0)
      return res.status(404).json({ msg: CURRENT_SECTION_NOT_FOUND });
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
      return res.status(404).json({ msg: CURRENT_SECTION_NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: ERROR_MESSAGE });
  }
};
const MilitaryEducation = async (req, res) => {
  const id = req.current;
  try {
    const data = await milityEduModel.findOne({ studentId: id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: ERROR_MESSAGE });
  }
};
const examTable = async (req, res) => {
  const student = req.current;
    const current = await Student.findById(student);
  const data = await examsTableModel.find();
  if (data.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  const currentData = data.filter((data) => {
    return (
      String(current.section) === String(data.academicDivision) &&
      String(current.squad) === String(data.classRoom) &&
       String(data.type) == String("ميد ترم")
    );
  });
  console.log(currentData)
  if (currentData.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  return res.status(200).json(currentData[0]);
};
const examTableOne = async (req, res) => {
  const student = req.current;
  const current = await Student.findById(student);
  const data = await examsTableModel.find();
  if (data.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  const currentData = data.filter((data) => {
    return (
      String(current.section) === String(data.academicDivision) &&
      String(current.squad) === String(data.classRoom) &&
      String(data.type) == String("فاينال")
      
    );
  });
  console.log(currentData)
  if (currentData.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  return res.status(200).json(currentData[0]);
};
const examTableTwo = async (req, res) => {
  const student = req.current;
  const current = await Student.findById(student);
  const data = await examsTableModel.find();
  if (data.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  const currentData = data.filter((data) => {
    return (
      String(current.section) === String(data.academicDivision) &&
      String(current.squad) === String(data.classRoom) &&
      String(data.type) == String("تخلفات")
    );
  });
  console.log(currentData)
  if (currentData.length == 0) return res.status(404).json({ msg: EXAM_TABLE });
  return res.status(200).json(currentData[0]);
};
const addCumulative = async (req, res) => {
const userIdToSearch =  req.current // يمكنك تغييره إلى الـ ID الذي تريد البحث عنه

  try {
    const data = await cumulativeModel.findById("65f8fe7270dbae86122b2194");
    if (!data) {
      return res.status(404).json({ msg: "البيانات غير موجودة" });
    }
    const userData = data.user;

    // البحث عن بيانات المستخدم بناء على الـ ID
    const user = userData.find(user => Object.keys(user)[0] === userIdToSearch);

    if (!user) {
      return res.status(404).json({ msg: "المستخدم غير موجود في البيانات" });
    }

    const userDataValues = Object.values(user)[0]; // الحصول على القيم الخاصة بالمستخدم

    // يمكنك القيام بأي عمليات تحويل البيانات أو المعالجة اللازمة هنا

    console.log(userDataValues);
    return res.status(201).json(userDataValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "حدث خطأ أثناء جلب البيانات" });
  }
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
  addCumulative,
  examTableTwo,
  examTableOne,
};
