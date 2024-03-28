import userModel from "../../../DB/model/user.model.js";
import tokenModel from "../../../DB/model/token.model.js";
import appError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
import randomstring from "randomstring";
import bcryptjs from "bcryptjs";
import path from "path";
import fs from "fs";
import { generateQR } from "../../utils/rqCode.js";
export const signUp = asyncHandler(async (req, res, next) => {
  const isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) {
    const err = appError.create("Account is already exist", 400);
    return next(err);
  }
  const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);

  const sent = await sendEmail({
    to: req.body.email,
    html: `<a href='http://localhost:3000/users/verify?token=${token}'>click here<a>`,
  });
  if (!sent) {
    const err = appError.create("cant handle the message", 500);
    return next(err);
  }
  await userModel.create({ ...req.body, "isEmail.tokenSign": token });
  return res
    .status(201)
    .json({ success: true, message: "User created successfully" });
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    const err = appError.create("Token not found", 404);
    return next(err);
  }
  const info = jwt.verify(token, process.env.SECRET_KEY);
  const user = await userModel.findOne({ email: info.email });
  if (!user) {
    const err = appError.create("User not found", 404);
    return next(err);
  }
  user.isEmail.tokenSign = null;
  user.isEmail.isVerify = true;
  await user.save();
  return res.send("<h1>Account verified successfully<h1>");
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    const err = appError.create("User not found", 404);
    return next(err);
  }

  if (!user.isEmail.isVerify) {
    const err = appError.create("email need to verify", 401);
    return next(err);
  }

  const code = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  const sent = await sendEmail({
    to: req.body.email,
    html: `<div>${code}</div>`,
  });
  if (!sent) {
    const err = appError.create("email failed try again", 500);
    return next(err);
  }
  user.isEmail.forgetCode = code;
  await user.save();
  return res.send(`<h1>check Email</h1>`);
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    const err = appError.create("User not found", 404);
    return next(err);
  }
  if (!user.isEmail.isVerify) {
    const err = appError.create("must verify email first", 401);
    return next(err);
  }
  if (user.isEmail.forgetCode !== req.body.code) {
    const err = appError.create("code isnt correct", 400);
    return next(err);
  }
  user.isEmail.forgetCode = null;
  user.password = req.body.password;
  await user.save();
  return res.json({ success: true, message: "Password changed successfully" });
});

export const login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    const err = appError.create("invalid email or password");
    return next(err);
  }

  const isMatched = bcryptjs.compareSync(req.body.password, user.password);
  if (!isMatched) {
    const err = appError.create("Password wrong", 404);
    return next(err);
  }
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET_KEY
  );
  await tokenModel.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  return res.json({ success: true, token });
});

export const addPhoto = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user.id, {
    profilePicture: req.file.path,
  });

  if (!user) {
    return next(new Error("Not found user"));
  }
  return res.json({ success: true, message: "Pic uploaded successfully" });
});

export const updatePhoto = asyncHandler(async (req, res, next) => {});

export const deletePhoto = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  const UserPath = user.profilePicture;
  if (!UserPath) return next(new Error("No profile pic"));
  const currentFileURL = import.meta.url;
  const currentDir = path.dirname(new URL(currentFileURL).pathname);
  const absolutePath = path.join(currentDir, "uploads", UserPath);
  console.log("currentFileURL ", currentFileURL);
  console.log("currentDir ", currentDir);
  console.log("absolutePath ", absolutePath);

  fs.unlinkSync(absolutePath);

  user.profilePicture = null;
  await user.save();
  return res.json({ success: true, message: "Pic deleted successfully" });
});

//add qrcode
export const qrFunction = asyncHandler(async (req, res, next) => {
  const gen = await generateQR(req.user);
  await userModel.findByIdAndUpdate(req.user.id, { qr: gen });
  return res.json({ success: true, results: { gen } });
});
