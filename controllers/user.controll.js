const { ERROR_MESSAGE } = require("../constants/msg");
const AboutApp = require("../models/aboutApp.model");
const cumulativeModel = require("../models/cumulative.model");
const examsTableModel = require("../models/exams-table.model");
const User = require("../models/login.model");
const milityEduModel = require("../models/mility-edu.model");
const scheduleModel = require("../models/schedule.model");
const Student = require("../models/students.model");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const exist = await User.exists({ num: req.body.num });
  if (!exist)
    return res.status(404).json({ msg: "المستخدم غير مسجل في قواعد البيانات" });
  const user = await User.findById(exist);
  if (user.password !== req.body.password)
    return res.status(404).json({ msg: "كلمة السر غير صحيحة" });
  const token = jwt.sign({ num: req.body.num }, process.env.SECRET_TOKEN);
  return res.status(200).json({ user, token });
};
const addNewStudent = async (req, res) => {
  const student = req.body;
  const newStudent = await Student(student);
  req.file ? (newStudent.image = req.file.filename) : "";
  try {
    newStudent.save();
    return res.status(201).json({ msg: "تم اضافة الطالب بنجاح" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const getStudents = async (req, res) => {
  const students = await Student.find();
  return res.status(200).json(students);
};
const getStudent = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findById(id);
  res.status(200).json(student);
};
const updateStudent = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const newStudent = await Student.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({ msg: "تم تعديل بيانات الطالب بنجاح" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const del = await Student.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "تم مسح الطالب بنجاح" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const addSeatingNumbers = async (req, res) => {
  const data = req.body;
  console.log(data);
  const addNum = async (student) => {
    await Student.findByIdAndUpdate(student._id, student);
  };
  data.map((student) => addNum(student));
};
const updateData = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  data.img = req.uniqueSuffix;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    user.password = undefined;
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
const classSchedules = async (req, res) => {
  console.log(req.body);
  const existClassRoom = await scheduleModel.exists({
    classRoom: req.body.classRoom,
  });
  const existType = await scheduleModel.exists({
    type: req.body.type,
  });
  if (existType) {
    if (existClassRoom) {
      const existAcademicDivision = await scheduleModel.exists({
        academicDivision: req.body.academicDivision,
      });
      if (existAcademicDivision)
        return res
          .status(400)
          .json({ msg: "الجدول موجود بالفعل يرجي اختيار بيانات اخري" });
    }
  }
  const data = new scheduleModel(req.body);
  try {
    await data.save();
    return res.status(201).json({ msg: "تم اضافة الجدول بنجاح" });
  } catch (error) {
    console.log(error);
  }
};
const getContent = async (req, res) => {
  const content = await AboutApp.find();
  return res.status(200).json(content[0]);
};
const updatePassword = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  const currentPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const user = await User.findById(id);
  if (user.password !== currentPassword)
    return res.status(400).json({ msg: "كلمة السر القديمة غير صحيحة" });
  if (currentPassword > 6)
    return res.status(400).json({ msg: "كلمة السر يجب ان تكون اكر من 6 حروف" });
  try {
    const update = await User.findByIdAndUpdate(id, { password: newPassword });
    return res.status(200).json({ msg: "تم تغيير كلمة السر بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "حدث خطأ ما برجاء المحاولة مرة اخري" });
  }
};
const examsTable = async (req, res) => {
  const existClassRoom = await examsTableModel.exists({
    classRoom: req.body.classRoom,
  });
  const existType = await examsTableModel.exists({
    type: req.body.type,
  });
  if (existType) {
    if (existClassRoom) {
      const existAcademicDivision = await examsTableModel.exists({
        academicDivision: req.body.academicDivision,
      });
      if (existAcademicDivision)
        return res
          .status(400)
          .json({ msg: "الجدول موجود بالفعل يرجي اختيار بيانات اخري" });
    }
  }
  const data = new examsTableModel(req.body);
  try {
    await data.save();
    return res.status(201).json({ msg: "تم اضافة الجدول بنجاح" });
  } catch (error) {
    console.log(error);
  }
  console.log(req.body);
};
const MilitaryEducation = async (req, res) => {
  try {
    // التحقق من وجود البيانات المطلوبة في طلب الويب
    if (
      !req.body.choseStu ||
      !Array.isArray(req.body.choseStu) ||
      !req.body.spltNum ||
      !req.body.startDate ||
      !req.body.endDate
    ) {
      return res.status(400).json({ msg: "بيانات غير صحيحة" });
    }

    // حفظ بيانات التعليم العسكري لكل طالب
    await Promise.all(
      req.body.choseStu.map(async (s) => {
        // تحديث بيانات التعليم العسكري إذا كانت موجودة بالفعل، وإلا إنشاء وحفظها
        try {
          const filter = { studentId: s._id };
          const update = {
            num: req.body.spltNum,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          };
          const options = { upsert: true, new: true };
          const result = await milityEduModel.findOneAndUpdate(
            filter,
            update,
            options
          );
          console.log("Result:", result);
        } catch (error) {
          // التحقق مما إذا كان الخطأ ناتجًا عن وجود بيانات مكررة
          if (error.code === 11000) {
            console.log("Duplicate data:", s._id);
            // يمكنك تنفيذ الإجراء المطلوب هنا مثل إرسال رسالة خطأ أو تحديث بيانات أخرى
          } else {
            console.error("Error saving data:", error);
            throw error;
          }
        }
      })
    );

    // إرجاع رسالة نجاح إلى العميل
    return res.status(200).json({ msg: "تم إرسال البيانات بنجاح" });
  } catch (error) {
    console.error("Error saving data:", error);
    // إرجاع رسالة خطأ في حالة فشل العملية
    return res.status(500).json({ msg: "حدث خطأ أثناء حفظ البيانات" });
  }
};

const getClassSchedules = async (req, res) => {
  try {
    const schedule = await scheduleModel.find();
    return res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
const addCumulative = async (req, res) => {
  const data = req.body;
  try {
    const updatedData = await cumulativeModel.findOneAndUpdate(
      { _id: "660eda04d0c308ef4b038fe8" },
      { $push: { user: data } }
    );
    if (!updatedData) {
      return res.status(404).json({ msg: "الوثيقة غير موجودة" });
    }
    return res.status(200).json({ msg: "تم تحديث الوثيقة بنجاح", updatedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "حدث خطأ أثناء حفظ البيانات" });
  }
};

const deleteSchedules = async (req, res) => {
  const id = req.params.id;
  try {
    const schedule = await scheduleModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "تم الحذف بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: ERROR_MESSAGE });
  }
};
const addCommitte = async (req, res) => {
  const data = req.body.choseStu || req.body;
  console.log(data);
  try {
    await Promise.all(
      data.map(async (student) => {
        await Student.findByIdAndUpdate(student._id, student);
      })
    );
    return res.status(200).json({ msg: "تم تحديث البيانات بنجاح" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "حدث خطأ أثناء تحديث البيانات" });
  }
};

const getSchedule = async (req, res) => {
  const id = req.params.id;
  const schedule = await scheduleModel.findById(id);
  if (!schedule) return res.status(404).json("لا يوجد بيانات");
  return res.status(200).json(schedule);
};
const editSchedule = async (req, res) => {
  let data = req.body;
  const id = req.params.id;
  try {
    const schedule = await scheduleModel.findByIdAndUpdate(
      id,
      { data },
      { new: true }
    );
    return res.status(201).json({ schedule, msg: "تم التغيير بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(ERROR_MESSAGE);
  }
};
const getExamsTable = async (req, res) => {
  const data = await examsTableModel.find();
  if (data.length === 0) {
    return res.status(404).json("لا يوجد بيانات");
  } else {
    return res.status(200).json(data);
  }
};
const DelExamsTable = async (req, res) => {
  const id = req.params.id;
  const data = await examsTableModel.findByIdAndDelete(id);
  return res.status(200).json({ msg: "تم حذف البيانات بنجاح" });
};
module.exports = {
  Login,
  addNewStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  addSeatingNumbers,
  updateData,
  classSchedules,
  getContent,
  updatePassword,
  examsTable,
  MilitaryEducation,
  getClassSchedules,
  addCumulative,
  deleteSchedules,
  addCommitte,
  getSchedule,
  getExamsTable,
  editSchedule,
  DelExamsTable,
};
