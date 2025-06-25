const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/db");
const userModel = require("./models/user.model");
const { database } = require("./assets/data");
const { router } = require("./routes/userRoutes");
const { default: mongoose } = require("mongoose");
connectDB();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", router);
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
// async function insertManyPosts() {
//   try {
//     const startDate = new Date("2024-01-01");
//     const endDate = new Date("2024-12-31");
//     const timeRange = endDate.getTime() - startDate.getTime();
//     const postsToInsert = [];

//     for (let i = 0; i < 1000; i++) {
//       const databaseEntry = database[i % database.length];

//       // Generate random date within 2024
//       const randomTime = startDate.getTime() + Math.random() * timeRange;
//       const randomDate = new Date(randomTime);

//       // Generate guaranteed valid high/low/medium values
//       const high = Math.floor(Math.random() * 50) + 10; // 10-59
//       const low = Math.floor(Math.random() * (high - 5)) + 1; // 1 to (high-5)
//       const medium = Math.floor(Math.random() * (high - low - 1)) + low + 1; // (low+1) to (high-1)

//       postsToInsert.push({
//         title: databaseEntry.title,
//         body: databaseEntry.body,
//         date: randomDate,
//         high,
//         low,
//         medium,
//       });
//     }

//     // Sort posts by date (ascending)
//     postsToInsert.sort((a, b) => a.date - b.date);

//     const result = await userModel.insertMany(postsToInsert);
//     console.log(`${result.length} posts inserted successfully!`);
//   } catch (error) {
//     console.error("Error inserting posts:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// insertManyPosts();

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
