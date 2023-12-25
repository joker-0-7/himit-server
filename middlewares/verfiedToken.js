const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authorization =
    req.headers["Authorization"] || req.headers["authorization"];
  try {
    const decoded = jwt.verify(authorization, process.env.SECRET_TOKEN);
    req.current = decoded.id
    next();
  } catch (err) {
    return res.status(401).json({ msg: "يباشا سجل من اول وجديد" });
  }
};
module.exports = verifyToken;
