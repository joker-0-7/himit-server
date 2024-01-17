var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var applicationRouter = require("./routes/application");
var doctorsRouter = require("./routes/doctor");
const { default: mongoose } = require("mongoose");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

mongoose
  .connect("mongodb://localhost:27017")

  .then(() => {
    console.log("DONE CONNECT TO DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/application", applicationRouter);
app.use("/doctor", doctorsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
// mongodb://localhost:27017
