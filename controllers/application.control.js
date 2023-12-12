const Student = require("../models/students.model");
const jwt = require("jsonwebtoken");
const Login = async (req, res) => {
  const { num, password } = req.body;
  const user = await Student.findOne({ num: num });
  if (!user) return res.status(404).send("انت مش موجود");
  if (user.password !== password)
    return res.status(404).json({ msg: "الباسورد غلط" });
  const id = user._id;
  const token = jwt.sign({ num, id }, process.env.SECRET_TOKEN, {
    expiresIn: "1m",
  });
  user.password = undefined;
  return res.status(200).json({ user, token });
};
const getData = (req, res) => {
  return res.status(200).json({ msg: "done" });
};
module.exports = {
  Login,
  getData,
};
