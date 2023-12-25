const Student = require("../models/students.model");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
  console.log(req.body);
  const { num, password } = req.body;
  const user = await Student.findOne({ num: num });
  if (!user) return res.status(404).send("انت مش موجود");
  if (user.password !== password)
    return res.status(404).json({ msg: "الباسورد غلط" });
  const id = user._id;
  const token = jwt.sign({ num, id }, process.env.SECRET_TOKEN);
  user.password = undefined;
  return res.status(200).json({ user, token });
};
const getData = async (req, res) => {
  const id = req.current;
  const user = await Student.findById(id);
  return res.status(200).json({ msg: "done", user });
};
module.exports = {
  Login,
  getData,
};
