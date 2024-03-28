import express from "express";
import "dotenv/config";
import appError from "./src/utils/appError.js";
import { connectDB } from "./DB/connectDb.js";
import userRouter from "./src/modules/user/user.route.js";
import taskRoute from "./src/modules/task/task.route.js";

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
await connectDB();

app.use("/users", userRouter);
app.use("/task", taskRoute);
app.all("*", (req, res, next) => {
  const err = appError.create("page not found", 404);
  return next(err);
});
app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Server Start at port ${process.env.PORT}`)
);
