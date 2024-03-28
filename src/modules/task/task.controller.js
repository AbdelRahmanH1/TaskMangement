import asyncHandler from "../../utils/asyncHandler.js";
import appError from "../../utils/appError.js";
import taskModel from "../../../DB/model/task.model.js";

export const addTask = asyncHandler(async (req, res, next) => {
  const isTask = await taskModel.findOne({ title: req.body.title });
  if (isTask) {
    const err = appError.create("Task is already exists", 400);
    return next(err);
  }
  await taskModel.create({ ...req.body, user: req.user.id });
  return res
    .status(201)
    .json({ success: true, message: "task added successfully" });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const taskDelete = await taskModel.deleteOne({ _id: id, user: req.user.id });

  if (taskDelete.deletedCount === 0) {
    const err = appError.create("Cant deleted the task", 400);
    return next(err);
  }
  return res.json({ success: true, message: "Task deleted Successfully" });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  const updateData = await taskModel.findOneAndUpdate(
    { _id: id, user: userId },
    { ...req.body }
  );
  if (!updateData) {
    const err = appError.create("Cant update data", 404);
    return next(err);
  }
  return res.json({ success: true, message: "Task updated sucessfully" });
});

export const taskDone = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  const done = await taskModel.findOneAndUpdate(
    { _id: id, user: userId },
    { completed: true }
  );
  if (!done) {
    const err = appError.create("Cant update the status", 403);
    return next(err);
  }
  return res.json({ success: true, message: "Done task completed" });
});

export const getAllTask = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;

  const data = await taskModel.find({ user: userID });
  if (data.length === 0) {
    const err = appError.create("cant Show data", 403);
    return next(err);
  }
  return res.json({ success: true, data: { data } });
});

export const getAllTaskCompleted = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;

  const data = await taskModel.find({ user: userID, completed: true });
  if (data.length === 0) {
    const err = appError.create("cant Show data", 403);
    return next(err);
  }
  return res.json({ success: true, data: { data } });
});

export const getAllTaskUncomplete = asyncHandler(async (req, res, next) => {
  const userID = req.user.id;

  const data = await taskModel.find({ user: userID, completed: false });
  if (data.length === 0) {
    const err = appError.create("cant Show data", 403);
    return next(err);
  }
  return res.json({ success: true, data: { data } });
});
